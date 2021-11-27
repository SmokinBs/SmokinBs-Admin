import Layout from "Layouts";
import React, { useRef } from "react";
import { InputGroup } from "@paljs/ui/Input";
import styled from "styled-components";
import { Button, EvaIcon, Select, Toastr, ToastrRef } from "@paljs/ui";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Input = styled(InputGroup)`
    margin-right: 1rem;
    display: inline-flex !important;
`;
const TextArea = styled(InputGroup)`
    margin-top: 1rem;
`;

const foodCategory: { value: any; label: any }[] = [
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

const CreateFood = () => {
    let toastrRef = useRef<ToastrRef>(null);

    const SubmitForm = async (e: any) => {
        e.preventDefault();

        const res = await fetch("/api/database/food/create", {
            method: "POST",
            body: JSON.stringify({
                name: e.target.name.value,
                price: e.target.price.value,
                category: e.target.category.value,
                description: e.target.description.value,
            }),
        }).then((res) => res.json());

        if (res.success) {
            location.reload();
            toastrRef.current?.add("Successfully created Food Item", "Created Food Item", {
                position: "topEnd",
                duration: 10_000,
                status: "Success",
                hasIcon: true,
                destroyByClick: true,
            });
        } else {
            location.reload();
            toastrRef.current?.add("Couldn't create Food Item", "Issue with Food Item", {
                position: "topEnd",
                duration: 10_000,
                status: "Danger",
                hasIcon: true,
                destroyByClick: true,
            });
        }
    };

    return (
        <Layout title="Create Food Item">
            <Toastr ref={toastrRef} />
            <h1>Create a Food Item</h1>
            <form onSubmit={SubmitForm} id="foodCreate">
                <Input shape="SemiRound" size="Large">
                    <input type="text" placeholder="Name of Item" name="name" required />
                </Input>

                <Input shape="SemiRound" size="Large">
                    <input type="number" placeholder="Price of Item (30 | 10| 5)" name="price" required />
                </Input>

                <Select
                    options={foodCategory}
                    className="food-select"
                    shape="SemiRound"
                    placeholder="Food Category"
                    size="Large"
                    name="category"
                    defaultInputValue={foodCategory[4].label}
                    required
                />

                <TextArea size="Giant" shape="SemiRound" fullWidth>
                    <textarea
                        id="description"
                        placeholder="Give a short description about the product"
                        name="description"
                        required
                    />
                </TextArea>
            </form>
            <Button type="submit" className="mT1" form="foodCreate">
                <EvaIcon name="file-add" /> Submit
            </Button>
        </Layout>
    );
};

export const getServerSideProps = withPageAuthRequired({
    returnTo: "/dashboard/food/create",
});

export default CreateFood;
