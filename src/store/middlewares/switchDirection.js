import { SET_LOCALE } from "../../modules/Common/store/action-types";
import moment from 'moment'
import 'moment/locale/ar'
import 'moment/locale/en-ca'

/** NOT USED */
function appendStylesheet(fileName, callback) {

    var styles = document.head.getElementsByTagName('style');
    var head = document.head;
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.insertBefore(link, styles[0]);

    setTimeout(() => {
        callback()
    }, 150)

}
/** NOT USED */
function removeStylesheet(fileName){
    var stylesheet = document.querySelector(`link[href='${fileName}']`);
    if(stylesheet){
        document.head.removeChild(stylesheet)
    }
}

const switchDirectionMiddleware = store => next => async (action) => {
    
    if(action.type === SET_LOCALE){
        if(action.payload === 'english'){
            document.body.classList.remove('rtl')
            document.querySelector("html").setAttribute("lang", "en")
            moment.locale('en-ca')
        }
        else {
            document.body.classList.add('rtl')
            document.querySelector("html").setAttribute("lang", "ar")
            moment.locale('ar')
        }
    }
  
    return next(action);
};

export default switchDirectionMiddleware;