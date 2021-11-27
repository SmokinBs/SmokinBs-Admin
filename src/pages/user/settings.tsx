import React, { useEffect, useState } from "react";
import Layout from "Layouts";
import { Button, EvaIcon, Select } from "@paljs/ui";
import styled, { DefaultTheme } from "styled-components";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = () => {
    return (
        <Layout title="Settings">
            <h1>Local Settings</h1>
            <p>(Refresh to see changes!)</p>

            <ThemeChanger />

            <Button className="mT5" status="Danger" onClick={() => (location.href = "/api/auth/logout")} fullWidth>
                <EvaIcon className="mR1" name="log-out" />
                Log Out
            </Button>
        </Layout>
    );
};
function ThemeChanger() {
    const [theme, setTheme] = useState<DefaultTheme["name"]>("default");

    const themeOptions = () => [
        {
            value: "default",
            label: (
                <Label>
                    <EvaIcon name="droplet" options={{ fill: "#a6c1ff" }} />
                    Default
                </Label>
            ),
        },
        {
            value: "dark",
            label: (
                <Label>
                    <EvaIcon name="droplet" options={{ fill: "#192038" }} />
                    Dark
                </Label>
            ),
        },
        {
            value: "cosmic",
            label: (
                <Label>
                    <EvaIcon name="droplet" options={{ fill: "#5a37b8" }} />
                    Cosmic
                </Label>
            ),
        },
        {
            value: "corporate",
            label: (
                <Label>
                    <EvaIcon name="droplet" options={{ fill: "#3366ff" }} />
                    Corporate
                </Label>
            ),
            selected: true,
        },
    ];
    const Label = styled.span`
        display: flex;
        align-items: center;
    `;

    const SelectStyled = styled(Select)`
        min-width: 150px;
        margin-top: 2rem;
    `;

    const changeTheme = (newTheme: DefaultTheme["name"]) => {
        setTheme(newTheme);
        typeof localStorage !== "undefined" && localStorage.setItem("theme", newTheme);
    };
    const getDefaultTheme = (): DefaultTheme["name"] => {
        if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
            return localStorage.getItem("theme") as DefaultTheme["name"];
        } else {
            const hours = new Date().getHours();
            return hours > 6 && hours < 19 ? "default" : "dark";
        }
    };

    useEffect(() => {
        const localTheme = getDefaultTheme();
        if (localTheme !== theme && theme === "default") {
            setTheme(localTheme);
        }
    });

    return (
        <SelectStyled
            instanceId="react-select-input"
            isSearchable={false}
            shape="SemiRound"
            placeholder="Themes"
            value={themeOptions().find((item) => item.value === theme)}
            options={themeOptions()}
            onChange={({ value }: { value: DefaultTheme["name"] }) => changeTheme(value)}
        />
    );
}

export default Settings;
