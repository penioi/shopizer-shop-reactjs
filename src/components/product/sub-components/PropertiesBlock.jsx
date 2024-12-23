import React, { Fragment } from "react";

const PropertiesBlock = ({ title, show, data }) => {

     return (
            <div>
                <div class="prop-block-title">{title}</div>
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