import PropTypes from "prop-types";
import React from "react";
import Select from 'react-select'
import Form from 'react-bootstrap/Form';

const ShopTopFilter = ({
  setAvailabilityFilters,
  setOriginFilters,
  setPriceFilters,
  setColorFilters,
  setSku,
  sku,
  avalabilityFilters,
  originFilters,
  priceFilters,
  colorFilters }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSku(e.target.value);
    }
  }
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      padding: 0,
      minHeight: '10px',
      input: {
        display: 'none'
      },
      div: {
        color: 'black'
      },
      span: {
        display: 'none'
      },
    })
  }
  const SelectItem = ( {title, options, cb, filters}) => (

    <div className="d-flex  flex-column mr-1">
      <Select placeholder={title} isMulti options={options} styles={colorStyles} onChange={cb} defaultValue={filters}/>
    </div>
  )
  
  return (
    <>
      <div className="d-flex shop-top-filter justify-content-between">
        <div className="d-flex">
      <SelectItem cb={setAvailabilityFilters} title="Availability" filters={avalabilityFilters} options={[
    {
        "label": "10 to 30m",
        "value": 1400
    },
    {
        "label": "31 to 50m",
        "value": 1401
    },
    {
        "label": "51 to 100m",
        "value": 1402
    },
    {
        "label": "Over 100m",
        "value": 1403
    },
    {
        "label": "Units",
        "value": 1404
    }
]}/>
      {/* <SelectItem title="Main material" options={["Acetate",
        "Cotton",
        "Cupro",
        "Elastane",
        "Lycra",
        "Linen",
        "Metal fibre",
        "Modal",
        "Nylon",
        "Polyester",
        "Silk",
        "Viscose",
        "Wool",
        "Polyurethane",
        "Polyamide",
        "Polyacrylic",
        "Virgin wool",
        "Alpaca",
        "Recycled wool"]} /> */}
      <SelectItem cb={setColorFilters} title="Colour" filters={colorFilters} options={[
    {
        "label": "Whites",
        "value": 1454
    },
    {
        "label": "Light shades",
        "value": 1455
    },
    {
        "label": "Light blues",
        "value": 1456
    },
    {
        "label": "Yellows",
        "value": 1457
    },
    {
        "label": "Pinks",
        "value": 1458
    },
    {
        "label": "Reds",
        "value": 1459
    },
    {
        "label": "Oranges",
        "value": 1460
    },
    {
        "label": "Browns",
        "value": 1461
    },
    {
        "label": "Purples",
        "value": 1462
    },
    {
        "label": "Nudes",
        "value": 1463
    },
    {
        "label": "Metallic",
        "value": 1464
    },
    {
        "label": "Greens",
        "value": 1465
    },
    {
        "label": "Greys",
        "value": 1466
    },
    {
        "label": "Dark blues",
        "value": 1467
    },
    {
        "label": "Dark shdes",
        "value": 1468
    },
    {
        "label": "Black",
        "value": 1469
    },
    {
        "label": "Multicolour",
        "value": 1470
    },
    {
        "label": "Monochrome",
        "value": 1471
    }
]} />
      {/* <SelectItem title="Construction" options={[
"Knit",
"Woven",
"Non-woven",
"Hides"]} />  */}
      <SelectItem cb={setPriceFilters} title="Price range" filters={priceFilters} options={[
    {
        "label": "Less than £3",
        "value": null
    },
    {
        "label": "£3 to £5",
        "value": null
    },
    {
        "label": "£6 to £10",
        "value": 1649
    },
    {
        "label": "£11 to £15",
        "value": 1650
    },
    {
        "label": "£16 to £30",
        "value": 1651
    },
    {
        "label": "Above £30",
        "value": null
    }
]} />
      {/* <SelectItem title="Supplier" options={["Racil",
"Flair Atelier",
"The House of a Thousand Fabrics",
"Maeba International",
"the materialist",
"Safia Collective",
"ERDEM",
"Procure Circular",
"Premium Maeba International",
"FibreLab"]} /> */}
      <SelectItem cb={setOriginFilters} title="Shipping from" filters={originFilters} options ={[
    {
        "label": "Italy",
        "value": 1676
    },
    {
        "label": "the UK",
        "value": null
    }
]} />
</div>
      <div>
        <Form.Control
          placeholder="Search..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          onBlur={(e) => setSku(e.target.value)}
          onKeyDown={handleKeyDown}
          defaultValue={sku}
          style={{
            fontSize: "14px",
            color: 'black',
            borderColor: "hsl(0, 0%, 80%)",
            borderRadius: "4px",
            "&::placeholder": {
              color: 'black', 
            }            
        }}

        />
      </div>
    </div>
  
      
    </>
  )
 
};

ShopTopFilter.propTypes = {
  setOriginFilters: PropTypes.func,
  setAvailabilityFilters: PropTypes.func,
  setColorFilters: PropTypes.func,
  setPriceFilters: PropTypes.func,
  setSku: PropTypes.func,
  avalabilityFilters: PropTypes.array,
  originFilters: PropTypes.array,
  colorFilters: PropTypes.array,
  priceFilters: PropTypes.array,
  sku: PropTypes.string,
};

export default ShopTopFilter;

