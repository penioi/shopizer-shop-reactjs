import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect, setState } from 'react';
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
import { useLocation } from "react-router-dom/cjs/react-router-dom";

const Category = ({ isLoading, strings, defaultStore, currentLanguageCode, categoryID, setLoader}) => {


 
    const [layout, setLayout] = useState('grid three-column');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const history = useHistory();
    const [offset, setOffset] = useState(parseInt(params.get("page")) || 1);
    const [totalPages, setTotalPages] = useState(1);
    const [count, setCount] = useState(parseInt(params.get("count"))|| parseInt(window._env_.APP_PRODUCT_GRID_LIMIT) || 30);
    const [productData, setProductData] = useState([]);
    const [totalProduct, setTotalProduct] = useState(0);
    const [availabilityFilters, setAvailabilityFilters] = useState([]);
    const [colorFilters, setColorFilters] = useState([]);
    const [priceFilters, setPriceFilters] = useState([]);
    const [originFilters, setOriginFilters] = useState([]);
    const [sku, setSku] = useState(params.get("sku"));
    
    let isMounted = true;
    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        return {
            offset: parseInt(params.get("page")) || offset,
            count: parseInt(params.get("count")) || count,
            sku: parseInt(params.get("sku")) || sku,
            filters: params.getAll("optionValue"),
        };
    };

    const getLayout = (layout) => {
        setLayout(layout)
    }

    useEffect(() => {
        const {offset, sku, count} = getQueryParams();
        setOffset(offset);
        setSku(sku);
        setCount(count)
        // setAvailabilityFilters(params.filters);
      }, [location.search]);
    
    const createUrlWithParams = () => {
        const params = new URLSearchParams();
        params.set('store', defaultStore);
        params.set('lang', currentLanguageCode);
        params.set('page', offset);
        params.set('count', count);
        params.set('category', categoryID);
    
        const addFilters = (filters, key) => {
            filters.forEach(filter => params.append(key, filter.value));
        };
        addFilters(availabilityFilters, 'optionValue');
        addFilters(colorFilters, 'optionValue');
        addFilters(priceFilters, 'optionValue');
        addFilters(originFilters, 'optionValue');
    
        return params.toString();
    };


    useEffect(() => {
        getProductList();
        return () => {
            isMounted = false;
        };
    }, [availabilityFilters, originFilters, priceFilters, colorFilters, sku, offset, count])

    const getProductList = async () => {
        setLoader(true);
        const newParams = new URLSearchParams(location.search);
        if (newParams.offset !== offset ||
                params.count !== count) {

            const queryString = createUrlWithParams();
            let action = `${constant.ACTION.PRODUCTS}?${queryString}`;
            history.replace({
                search: `?${queryString}`,
            });
            try {
                let response = await WebService.get(action);
                if (isMounted && response) {
                    setTotalPages(response.totalPages)
                    setProductData(response.products);
                    setTotalProduct(response.recordsTotal)
                }
                setLoader(false)
            } catch (error) {
                setLoader(false)
            }
        } 

        
    }

    return (
        <Fragment>
            <Layout headerContainerClass="container-fluid"
                headerPaddingClass="header-padding-2"
                headerTop="visible">

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        {
                            productData.length > 0 ?
                                (<div className="row">
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

                                        <ShopTopbar strings={strings} getLayout={getLayout} productCount={totalProduct} offset={offset} count={count} sortedProductCount={productData.length} />

                                        <ShopProducts strings={strings} layout={layout} products={productData} />

                                        <div className="pro-pagination-style text-center mt-30">
                                            <ReactPaginate
                                                previousLabel={'«'}
                                                nextLabel={'»'}
                                                breakLabel={'...'}
                                                breakClassName={'break-me'}
                                                pageCount={totalPages}
                                                onPageChange={(e) => {
                                                    return setOffset(e.selected + 1)
                                                }}
                                                forcePage={offset - 1}
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