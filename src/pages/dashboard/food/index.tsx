import Layout from "Layouts";
import React, { useRef } from "react";
import { Accordion, AccordionItem, Button, EvaIcon, Popover, Tab, Tabs, Toastr, ToastrRef } from "@paljs/ui";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/food",
    async getServerSideProps() {
        const data = await (await fetch("https://admin.smokinbsbbqtest.tk/api/findAllFood")).json();

        return {
            props: {
                foods: data.foods,
            },
        };
    },
});

const Food = (props: { foods: any }) => {
    let toastrRef = useRef<ToastrRef>(null);
    function MakeCard({ id, name, shortDescription, category }: any) {
        const deleteItem = async (itemId: string, name: string) => {
            console.log(itemId);
            if (confirm("Are you sure you want to delete this? !! THIS IS IRREVERSIBLE !!")) {
                await fetch(`/api/database/deleteFood`, {
                    method: "POST",
                    body: JSON.stringify({
                        id,
                    }),
                })
                    .then(() => {
                        location.reload();
                        toastrRef.current?.add("Refreshing...", `Deleted ${name}`, {
                            position: "topEnd",
                            duration: 10_000,
                            status: "Success",
                            hasIcon: true,
                            destroyByClick: true,
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        toastrRef.current?.add(`Couldn't delete item. Error: ${err}`, `Error Deleting ${name}`, {
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
            <Accordion>
                <AccordionItem uniqueKey={id} title={name}>
                    {shortDescription}
                    <br />
                    <div className="mT1">
                        <strong>Category:</strong> {category}
                    </div>
                    <br />
                    <Button className="food-button" onClick={() => (location.href = `/dashboard/food/edit/${id}`)}>
                        <EvaIcon name="edit" />
                    </Button>
                    <Button status="Danger" onClick={() => deleteItem(id, name)}>
                        <EvaIcon name="trash" />
                    </Button>
                </AccordionItem>
            </Accordion>
        );
    }

    return (
        <Layout title="Food Dashboard">
            <Toastr ref={toastrRef} />
            <Button
                appearance="hero"
                className="mB1"
                onClick={() => {
                    window.location.href = "/dashboard/food/create";
                }}
            >
                <Popover trigger="hint" placement="top" overlay="Create Item">
                    <EvaIcon name="file-add" />
                </Popover>
            </Button>
            <Tabs fullWidth>
                <Tab
                    title="Meats"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.foods.filter((i: { category: string }) => i.category === "Meats").length,
                    }}
                    responsive
                >
                    {props.foods
                        .filter((item: { category: string }) => item.category === "Meats")
                        .map((item: { _id: any; name: any; shortDescription: any; category: any }) => (
                            <MakeCard
                                id={item._id}
                                name={item.name}
                                shortDescription={item.shortDescription}
                                category={item.category}
                            />
                        ))}
                </Tab>
                <Tab
                    title="Sides"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.foods.filter((i: { category: string }) => i.category === "Sides").length,
                    }}
                    responsive
                >
                    {props.foods
                        .filter((item: { category: string }) => item.category === "Sides")
                        .map((item: { _id: any; name: any; shortDescription: any; category: any }) => (
                            <MakeCard
                                id={item._id}
                                name={item.name}
                                shortDescription={item.shortDescription}
                                category={item.category}
                            />
                        ))}
                </Tab>
                <Tab
                    title="Desserts"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.foods.filter((i: { category: string }) => i.category === "Desserts").length,
                    }}
                    responsive
                >
                    {props.foods
                        .filter((item: { category: string }) => item.category === "Desserts")
                        .map((item: { _id: any; name: any; shortDescription: any; category: any }) => (
                            <MakeCard
                                id={item._id}
                                name={item.name}
                                shortDescription={item.shortDescription}
                                category={item.category}
                            />
                        ))}
                </Tab>
                <Tab
                    title="Plates"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.foods.filter((i: { category: string }) => i.category === "Plates").length,
                    }}
                    responsive
                >
                    {props.foods
                        .filter((item: { category: string }) => item.category === "Plates")
                        .map((item: { _id: any; name: any; shortDescription: any; category: any }) => (
                            <MakeCard
                                id={item._id}
                                name={item.name}
                                shortDescription={item.shortDescription}
                                category={item.category}
                            />
                        ))}
                </Tab>
                <Tab
                    title="No Category"
                    badge={{
                        status: "Info",
                        position: "topStart",
                        title: props.foods.filter((i: { category: string }) => i.category === "No-Category").length,
                    }}
                    responsive
                >
                    {props.foods
                        .filter((item: { category: string }) => item.category === "No-Category")
                        .map((item: { _id: any; name: any; shortDescription: any; category: any }) => (
                            <MakeCard
                                id={item._id}
                                name={item.name}
                                shortDescription={item.shortDescription}
                                category={item.category}
                            />
                        ))}
                </Tab>
            </Tabs>
        </Layout>
    );
};

export default Food;
