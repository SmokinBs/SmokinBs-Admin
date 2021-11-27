import React, { useState, useRef, useEffect, Fragment } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import themes from "./themes";
import { Layout, LayoutContent, LayoutFooter, LayoutContainer, LayoutColumns, LayoutColumn } from "@paljs/ui/Layout";
import icons from "@paljs/icons";
import { SidebarBody, SidebarRefObject, Sidebar } from "@paljs/ui/Sidebar";
import Header from "./Header";
import SimpleLayout from "./SimpleLayout";
import { useRouter } from "next/router";
import { EvaIcon } from "@paljs/ui/Icon";
import { Button } from "@paljs/ui/Button";
import { Menu, MenuRefObject } from "@paljs/ui/Menu";
import Link from "next/link";
import menuItems from "./menuItem";
import SEO, { SEOProps } from "components/SEO";

const getDefaultTheme = (): DefaultTheme["name"] => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
        return localStorage.getItem("theme") as DefaultTheme["name"];
    } else {
        const hours = new Date().getHours();
        return hours > 6 && hours < 19 ? "default" : "dark";
    }
};

const LayoutPage: React.FC<SEOProps> = ({ children, ...rest }) => {
    const [theme, setTheme] = useState<DefaultTheme["name"]>("default");
    const dir = "ltr";
    const sidebarRef = useRef<SidebarRefObject>(null);
    const router = useRouter();
    const [menuState, setMenuState] = useState(false);
    const menuRef = useRef<MenuRefObject>(null);
    const [seeHeader, setSeeHeader] = useState(true);

    const [serverOpen, setServerOpen] = useState(false);

    const getState = (state?: "hidden" | "visible" | "compacted" | "expanded") => {
        setSeeHeader(state !== "compacted");
    };

    const changeTheme = (newTheme: DefaultTheme["name"]) => {
        setTheme(newTheme);
        typeof localStorage !== "undefined" && localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const localTheme = getDefaultTheme();
        if (localTheme !== theme && theme === "default") {
            setTheme(localTheme);
        }
    }, []);

    const authLayout = router.pathname.startsWith("/auth");

    return (
        <Fragment>
            <SEO {...rest} />
            <ThemeProvider theme={themes(theme, dir)}>
                <Fragment>
                    <SimpleLayout />
                    <Layout evaIcons={icons} dir={dir} className={!authLayout ? "auth-layout" : ""}>
                        {!authLayout && (
                            <Header
                                title={rest.title || ""}
                                dir={dir}
                                theme={{ set: changeTheme, value: theme }}
                                toggleSidebar={() => sidebarRef.current?.toggle()}
                            />
                        )}
                        <LayoutContainer>
                            {!authLayout && (
                                <Sidebar
                                    getState={getState}
                                    ref={sidebarRef}
                                    property="start"
                                    containerFixed
                                    responsive
                                    className="menu-sidebar"
                                >
                                    {seeHeader && (
                                        <header>
                                            <Button
                                                className="textLarge"
                                                size="Tiny"
                                                status="Primary"
                                                onClick={async () => {
                                                    const data: any = await (
                                                        await fetch("/api/openCloseBusiness")
                                                    ).json();
                                                    console.log(data.isServerOpen);

                                                    setServerOpen(data.isServerOpen);
                                                }}
                                                fullWidth
                                            >
                                                {serverOpen ? (
                                                    <EvaIcon className="mR1" name="lock" />
                                                ) : (
                                                    <EvaIcon className="mR1" name="unlock" />
                                                )}
                                                {serverOpen ? "Close Business" : "Open Business"}
                                            </Button>
                                        </header>
                                    )}
                                    <SidebarBody>
                                        <Menu
                                            nextJs
                                            className="sidebar-menu"
                                            Link={Link}
                                            ref={menuRef}
                                            items={menuItems}
                                            currentPath={router.pathname}
                                            toggleSidebar={() => sidebarRef.current?.hide()}
                                        />
                                    </SidebarBody>
                                </Sidebar>
                            )}
                            <LayoutContent>
                                <LayoutColumns>
                                    <LayoutColumn className="main-content">{children}</LayoutColumn>
                                </LayoutColumns>
                                {!authLayout && <LayoutFooter>&copy;Smokin Bs BBQ</LayoutFooter>}
                            </LayoutContent>
                        </LayoutContainer>
                    </Layout>
                </Fragment>
            </ThemeProvider>
        </Fragment>
    );
};

export default LayoutPage;
