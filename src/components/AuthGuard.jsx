import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router";

const API_KEY = '8b8f1d39af9c4251af69500070550953'

async function getData(){
    const response = await fetch(`https://crudcrud.com/api/${API_KEY}/tweets`);
    if(!response.ok){
        throw new Error('Data not found');
    }
    return response.json();
}

function AuthGuard(){
    const {data:tweetData, isPending, isError, error} = useQuery({
        queryKey: ['tweets'],
        queryFn : getData
    })

    if(isPending) return <h1>...Loading</h1>
    if(isError) return <h1>{error.message}</h1>

    return(
        <>
        {console.log("tweetData", tweetData)}
        </>
    )
}

// -------------------------------------------------------------------------------------------

async function addData(newData) {
    console.log("newData", newData)
    const response = await fetch(`https://crudcrud.com/api/${API_KEY}/tweets`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(newData)
    })
    return response.json();
}

function AddData(){
    const queryClient = useQueryClient();
    const [data, setData] = useState("");

    const mutation = useMutation({
        mutationFn: addData,
        onSuccess : () =>{
            queryClient.invalidateQueries({ queryKey: ["tweets"] })
        }
    })


    function handleSubmit(e){
        e.preventDefault()
        mutation.mutate({tweet : data, like : 0})
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label>Messsage</label>
            <textarea name="message" placeholder="Enter message" value={data} onChange={(e) => setData(e.target.value)} />
            <button type="submit">Create</button>
        </form>
        </>
    )
}

// ------------------------------------------------------------------------------------------------


async function updateData({ id, updatedData }) {
    const response = await fetch(`https://crudcrud.com/api/${API_KEY}/tweets/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedData)
        }
    );
    if (!response.ok) {
        throw new Error('Failed to update tweet');
    }
    return response.json();
}

function UpdateData() {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (updatedData) => updateData({ id, updatedData }),

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: ['tweets']
            });

            const previousData = queryClient.getQueryData(['tweets']);

            queryClient.setQueryData(['tweets'], (oldData) => {
                return oldData ? {...oldData, like: (oldData.like ?? 0) + 1} : oldData;
            });
            return { previousData };
        },

        onError: (error, variables, context) => {
            queryClient.setQueryData(['tweets'], context.previousData);
        },

        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['tweets']});
        }
    });
}


export {AuthGuard, AddData, UpdateData};