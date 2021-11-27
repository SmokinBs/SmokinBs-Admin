import { UserProvider } from "@auth0/nextjs-auth0";
import DayJSUtils from "@date-io/dayjs";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AppProps } from "next/app";

import "../styles/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
    <MuiPickersUtilsProvider utils={DayJSUtils}>
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    </MuiPickersUtilsProvider>
);

export default MyApp;
