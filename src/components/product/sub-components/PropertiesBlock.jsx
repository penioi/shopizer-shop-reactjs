import React from "react";

const PropertiesBlock = ({ title, show, data }) => {
    if (!data?.length) {
      return null;
    }
     return (
            <div className="mr-2">
                {/* <div class="prop-block-title">{title}</div> */}
                <ul>
                {show.map(name => data.map( value => value.property.code === name ?   
                        (<li>
                          <span><b>{value.property.name}</b></span> {value.propertyValue.name}
                        </li>
                        ) : console.log(value, " is not ", name)))}
                </ul>
            </div>
          )
}
export default PropertiesBlock;