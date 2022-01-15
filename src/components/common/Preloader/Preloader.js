import preloader from "../../../assets/img/Loading.svg"
import React from "react";
import style from "./Preloader.module.css"

let Preloader = (props) => {
    return (<>
            {
                props.isFetching ?
                    <div className={style.container}>
                        <img src={preloader} alt='#'/>
                    </div> : <div/>
            }
        </>
    )
}

export default Preloader