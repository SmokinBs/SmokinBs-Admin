import Layout from "Layouts";
import React, { useRef } from "react";
import { Accordion, AccordionItem, Button, EvaIcon, Popover, Tab, Tabs, Toastr, ToastrRef } from "@paljs/ui";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/alerts",
    async getServerSideProps() {
        const data = await(
            await fetch(`${process.env.API_URL}/v0/alerts/find-all?authId=${process.env.API_CREDENTIALS?.toString()}`)
        ).json();
        console.log(data);

        return {
            props: {
                alerts: data.alerts,
            },
        };
    },
});

export let toastrRef: any;

const Alert = ({ alerts }: { alerts: any }) => {
    toastrRef = useRef<ToastrRef>();

    const deleteItem = async (itemId: string, titleDelete: string) => {
        console.log(itemId);
        if (confirm("Are you sure you want to delete this? !! THIS IS IRREVERSIBLE !!")) {
            await fetch(`/api/database/alert/delete`, {
                method: "POST",
                body: JSON.stringify({
                    id: itemId,
                }),
            })
                .then(() => {
                    location.reload();
                    toastrRef.current?.add("Refreshing...", `Deleted ${titleDelete}`, {
                        position: "topEnd",
                        duration: 10_000,
                        status: "Success",
                        hasIcon: true,
                        destroyByClick: true,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    toastrRef.current?.add(`Couldn't delete item. Error: ${err}`, `Error Deleting ${titleDelete}`, {
                        position: "topEnd",
                        duration: 10_000,
                        status: "danger",
                        hasIcon: true,
                        destroyByClick: true,
                    });
                });
        }
    };

    return (
        <Layout title="Alert Dashboard">
            <Toastr ref={toastrRef} />
            <Button
                appearance="hero"
                className="mB1"
                onClick={() => {
                    window.location.href = "/dashboard/alerts/create";
                }}
            >
                <Popover trigger="hint" placement="top" overlay="Create Alert">
                    <EvaIcon name="file-add" />
                </Popover>
            </Button>
            <Tabs fullWidth>
                <Tab
                    title="All Alerts"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: alerts.length,
                    }}
                    responsive
                >
                    {!(alerts.length > 0) ? (
                        <h1>No Alerts!</h1>
                    ) : (
                        <Accordion>
                            {alerts.map(
                                ({
                                    _id,
                                    title,
                                    content,
                                    expireAt,
                                }: {
                                    _id: any;
                                    title: string;
                                    content: string;
                                    expireAt: any;
                                }) => (
                                    <AccordionItem uniqueKey={_id} title={title}>
                                        {content}
                                        <br />
                                        <p className="mT1">
                                            Expires: {new Date(expireAt).toLocaleDateString()} -{" "}
                                            {new Date(expireAt).toLocaleTimeString()}
                                        </p>
                                        <Button className="mT1" status="Danger" onClick={() => deleteItem(_id, title)}>
                                            <EvaIcon name="trash" />
                                        </Button>
                                    </AccordionItem>
                                ),
                            )}
                        </Accordion>
                    )}
                </Tab>
                <></>
            </Tabs>
        </Layout>
    );
};

export default Alert;
