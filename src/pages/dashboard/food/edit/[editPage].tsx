import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Toastr, EvaIcon, InputGroup, Select, Button, ToastrRef } from "@paljs/ui";
import Layout from "Layouts";
import React, { useRef } from "react";
import styled from "styled-components";

const Input = styled(InputGroup)`
    margin-right: 1rem;
    display: inline-flex !important;
`;
const TextArea = styled(InputGroup)`
    margin-top: 1rem;
`;
const foodCategory: { value: string; label: string }[] = [
    {
        value: "Meats",
        label: "Meats",
    },
    {
        value: "Sides",
        label: "Sides",
    },
    {
        value: "Desserts",
        label: "Desserts",
    },
    {
        value: "Plates",
        label: "Plates",
    },
    {
        value: "No-Category",
        label: "No Category",
    },
];

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/food",
    async getServerSideProps(ctx) {
        const foodId = ctx.req.url?.replace("?", "")?.split("/")[4];

        const data = await(
            await fetch(
                `${process.env.API_URL}/v0/foods/find-one?id=${foodId}&authId=${process.env.API_CREDENTIALS}`
            )
        ).json();
		console.log

        return {
            props: {
                item: data.item,
            },
        };
    },
});

const EditFoodItem = ({ item }: any) => {
    let toastrRef = useRef<ToastrRef>(null);

    const SubmitForm = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/database/food/update", {
            method: "POST",
            body: JSON.stringify({
                _id: item._id,
                name: e.target.name.value,
                price: e.target.price.value,
                category: e.target.category.value,
                description: e.target.description.value,
            }),
        }).then((res) => res.json());

        if (res.success) {
            location.reload();
            toastrRef.current?.add(`Successfully updated ${e.target.name.value}`, `Updated ${e.target.name.value}`, {
                position: "topEnd",
                duration: 10_000,
                status: "Success",
                hasIcon: true,
                destroyByClick: true,
            });
        } else {
            location.reload();
            toastrRef.current?.add(`Couldn't update ${e.target.name.value}`, `Issue with ${e.target.name.value}`, {
                position: "topEnd",
                duration: 10_000,
                status: "Danger",
                hasIcon: true,
                destroyByClick: true,
            });
        }
    };

    return (
        <Layout title={`Editing ${item.name}`}>
            <Toastr ref={toastrRef} />
            <h1>Editing {item.name}</h1>
            <form onSubmit={SubmitForm} id="updateFood">
                <Input shape="SemiRound" size="Large">
                    <input type="text" placeholder="Name of Item" defaultValue={item.name} name="name" required />
                </Input>

                <Input shape="SemiRound" size="Large">
                    <input
                        type="number"
                        placeholder="Price of Item (30 | 10| 5)"
                        defaultValue={item.price}
                        name="price"
                        required
                    />
                </Input>

                <Select
                    options={foodCategory}
                    className="food-select"
                    shape="SemiRound"
                    placeholder="Food Category"
                    size="Large"
                    name="category"
                    defaultInputValue={item.category}
                    required
                />

                <TextArea size="Giant" shape="SemiRound" fullWidth>
                    <textarea
                        id="description"
                        placeholder="Give a short description about the product"
                        defaultValue={item.shortDescription}
                        name="description"
                        required
                    />
                </TextArea>
            </form>
            <Button type="submit" className="mT1" form="updateFood">
                <EvaIcon className="mR1" name="file-add" /> Update
            </Button>
        </Layout>
    );
};

export default EditFoodItem;
