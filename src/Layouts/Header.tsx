import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { DefaultTheme } from "styled-components";
import { LayoutHeader } from "@paljs/ui/Layout";
import { Actions } from "@paljs/ui/Actions";
import ContextMenu from "@paljs/ui/ContextMenu";
import User from "@paljs/ui/User";
import { breakpointDown } from "@paljs/ui/breakpoints";
import { useUser } from "@auth0/nextjs-auth0";

const HeaderStyle = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    ${breakpointDown("sm")`
    .right{
      display: none;
    }
  `}
    .right > div {
        height: auto;
        display: flex;
        align-content: center;
    }
    .logo {
        font-size: 1.25rem;
        white-space: nowrap;
        text-decoration: none;
    }
    .left {
        display: flex;
        align-items: center;
        .github {
            font-size: 18px;
            margin-right: 5px;
        }
    }
`;

interface HeaderProps {
    title: String;
    toggleSidebar: () => void;
    theme: {
        set: (value: DefaultTheme["name"]) => void;
        value: DefaultTheme["name"];
    };
    dir: "ltr";
}

const Header: React.FC<HeaderProps> = (props) => {
    const router = useRouter();
    const { user } = useUser();

    return (
        <LayoutHeader fixed>
            <HeaderStyle>
                <Actions
                    size="Medium"
                    actions={[
                        {
                            icon: { name: "menu-2-outline" },
                            url: {
                                onClick: props.toggleSidebar,
                            },
                        },
                        {
                            content: (
                                <Link href="#">
                                    <a className="logo">{props.title}</a>
                                </Link>
                            ),
                        },
                    ]}
                />
                <Actions
                    size="Small"
                    className="right"
                    actions={[
                        {
                            icon: "facebook",
                            url: {
                                href: "https://www.facebook.com/nickssmokinbsbbq/?ref=page_internal&mt_nav=0",
                                target: "_blank",
                            },
                        },
                        {
                            icon: "email",
                            url: { href: "mailto:nbrown6911@gmail.com", target: "_blank" },
                        },
                        {
                            content: (
                                <>
                                    {user ? (
                                        <ContextMenu
                                            nextJs
                                            style={{ cursor: "pointer" }}
                                            placement="bottom"
                                            currentPath={router.pathname}
                                            items={[
                                                {
                                                    title: "Settings",
                                                    icon: "settings",
                                                    link: { href: "/user/settings" },
                                                },
                                                {
                                                    title: "Log out",
                                                    icon: "log-out",
                                                    link: { href: "/api/auth/logout" },
                                                },
                                            ]}
                                            Link={Link}
                                        >
                                            <User
                                                image={user?.picture?.toString()}
                                                name={user?.name?.toString()}
                                                size="Large"
                                            />
                                        </ContextMenu>
                                    ) : null}
                                </>
                            ),
                        },
                    ]}
                />
            </HeaderStyle>
        </LayoutHeader>
    );
};
export default Header;
