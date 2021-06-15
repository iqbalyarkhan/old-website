import {store} from "@risingstack/react-easy-state";

const appStore = store({
    color: true,
    switchTheme(){
        appStore.color = !appStore.color;
        console.log("***** SWTICH THEME CALLED ******, light color: " + appStore.color);
    }
});

export default appStore