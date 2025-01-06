import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from 'react';
import MetaTags from 'react-meta-tags';
import { useHistory } from "react-router-dom";
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { connect } from 'react-redux';
import Layout from '../../layouts/Layout';
import ShopTopbar from '../../wrappers/product/ShopTopbar';
import ShopProducts from '../../wrappers/product/ShopProducts';
import WebService from '../../util/webService';
import constant from '../../util/constant';
import { isCheckValueAndSetParams } from '../../util/helper';
import { setLoader } from "../../redux/actions/loaderActions";
import { multilanguage } from "redux-multilanguage";
import { setCategoryID } from "../../redux/actions/productActions";
import ReactPaginate from 'react-paginate';
import ShopTopFilter from "../../components/product/ShopTopFilter";

const Category = ({ setCategoryID, isLoading, strings, location, defaultStore, currentLanguageCode, categoryID, setLoader, }) => {
    const [layout, setLayout] = useState('grid three-column');
    const history = useHistory();
    const [categoryValue, setCategoryValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const pageLimit = parseInt(window._env_.APP_PRODUCT_GRID_LIMIT) || 12;
    const [productData, setProductData] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [productDetails, setProductDetails] = useState('');
    const [size, setSize] = useState([]);
    const [availabilityFilters, setAvailabilityFilters] = useState([]);
    const [colorFilters, setColorFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [originFilters, setOriginFilters] = useState([]);
    const [sku, setSku] = useState("");
    let isMounted = true;

    const { pathname } = location;

    const getLayout = (layout) => {
        setLayout(layout)
    }

    const createUrlWithParams = () => (`?${isCheckValueAndSetParams('&store=', defaultStore)}
        ${isCheckValueAndSetParams('&lang=', currentLanguageCode)}
        ${isCheckValueAndSetParams('&page=', offset)}
        ${isCheckValueAndSetParams('&count=', pageLimit)}
        ${isCheckValueAndSetParams('&category=', categoryID)}
        ${isCheckValueAndSetParams('&sku=', sku)}
        ${isCheckValueAndSetParams('&optionValues=', [].join())}
        ${isCheckValueAndSetParams('&manufacturer=', [].join())}`).split(/\n/).map(str => str.trim()).join("");

    const createFiltersUri = (arr) => (arr.map(filter => `&optionValues=${filter.value}`)).join("");



    useEffect(() => {
        getProductList();
        return () => {
            isMounted = false;
        };
    }, [availabilityFilters, originFilters, priceFilters, colorFilters, sku])
    useEffect(() => {

        setCategoryValue(categoryID)
        setSize([])
        getProductList(categoryID, []);
    }, [categoryID, offset]);

    const getProductList = async () => {
        setLoader(true)
        const optionValueUri = `${createFiltersUri([
            ...availabilityFilters,
            ...colorFilters,
            ...priceFilters,
            ...originFilters
        ])}`
        let action = `${constant.ACTION.PRODUCTS}${createUrlWithParams()}${optionValueUri}`;
        // history.push(optionValueUri);

        try {
            let response = await WebService.get(action);
            if (isMounted && response) {
                setCurrentPage(response.totalPages)
                setProductData(response.products);
                setTotalProduct(response.recordsTotal)
            }
            setLoader(false)
        } catch (error) {
            setLoader(false)
        }
    }

    return (
        <Fragment>
            <MetaTags>
                <title>{productDetails && productDetails.description.title}</title>
                <meta name="description" content={productDetails && productDetails.description.metaDescription} />
            </MetaTags>

            <BreadcrumbsItem to={import.meta.env.PUBLIC_URL + '/'}>{strings["Home"]}</BreadcrumbsItem>
            {productDetails && productDetails.parent !== null && <BreadcrumbsItem onClick={() => setCategoryID(productDetails.parent.id)} to={"/category/" + productDetails.parent.code}>{productDetails.parent.code}</BreadcrumbsItem>}
            <BreadcrumbsItem to={import.meta.env.PUBLIC_URL + pathname}>{productDetails && productDetails.description.name}</BreadcrumbsItem>

            <Layout headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-2"
                headerTop="visible">

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        {
                            productData.length > 0 ?
                                (<div className="row">
                                        {/* shop sidebar */}
                                        {/* <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30" /> */}
                                        {/* <ShopSidebar string={strings} getSortParams={getSortParams} getCategoryParams={getCategoryParams} uniqueCategories={subCategory} uniqueColors={color} uniqueSizes={size} uniqueManufacture={manufacture} sideSpaceClass="mr-30" /> */}
                                    
                                    <div className="col-12">
                                        <ShopTopFilter
                                            avalabilityFilters={availabilityFilters}
                                            priceFilters={priceFilters}
                                            originFilters={originFilters}
                                            colorFilters={colorFilters}
                                            sku={sku}
                                            setSku={setSku}
                                            setAvailabilityFilters={setAvailabilityFilters}
                                            setPriceFilters={setPriceFilters}
                                            setOriginFilters={setOriginFilters}
                                            setColorFilters={setColorFilters}/>

                                           {/* shop topbar default */}
                                        {/* <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={productData.length} /> */}
                                        <ShopTopbar strings={strings} getLayout={getLayout} productCount={totalProduct} offset={offset + 1} pageLimit={pageLimit} sortedProductCount={productData.length} />

                                        {/* shop page content default */}
                                        <ShopProducts strings={strings} layout={layout} products={productData} />

                                        {/* shop product pagination */}


                                        <div className="pro-pagination-style text-center mt-30">
                                            <ReactPaginate
                                                previousLabel={'«'}
                                                nextLabel={'»'}
                                                breakLabel={'...'}
                                                breakClassName={'break-me'}
                                                pageCount={currentPage}
                                                onPageChange={(e) => setOffset(e.selected)}
                                                containerClassName={'mb-0 mt-0'}
                                                activeClassName={'page-item active'}
                                            />
                                        </div>

                                    </div>
                                </div>)
                                :
                                (
                                    !isLoading && <div className="col-lg-12">
                                        <div className="item-empty-area text-center">
                                            <div className="item-empty-area__icon mb-30">
                                                <i className="pe-7s-shopbag"></i>
                                            </div>
                                            <div className="item-empty-area__text">
                                                {strings["No items found in category"]}<br />{" "}

                                            </div>
                                        </div>
                                    </div>)
                        }
                    </div>
                </div>
            </Layout>
        </Fragment>
    )
}

Category.propTypes = {
    location: PropTypes.object,
    products: PropTypes.array
}

const mapStateToProps = state => {

    return {
        currentLanguageCode: state.multilanguage.currentLanguageCode,
        defaultStore: state.merchantData.defaultStore,
        categoryID: state.productData.categoryid,
        isLoading: state.loading.isLoading

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setLoader: (value) => {
            dispatch(setLoader(value));
        },
        setCategoryID: (value) => {
            dispatch(setCategoryID(value));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(multilanguage(Category));