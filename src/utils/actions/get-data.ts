import { redirect } from "next/navigation";

// function delay(ms: number){
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

export async function getDataHome() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects/67a20f7403a8330f06b9eaeb?pretty=
            true&read_key=${process.env.READ_KEY}&depth=1&props=slug,title,metadata,type`, { next: { revalidate: 120 } })

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        return res.json();
    } catch (err) {
        throw new Error("Failed to fetch data")
    }
}

export async function getSubMenu() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/objects?pretty=true&query=
            %7B%22type%22%3A%22pages%22%7D&limit=10&skip=0&read_key=${process.env.READ_KEY}&depth=1&props=slug%2Ctitle&sort=-order`, { next: { revalidate: 120 } })

        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }

        return res.json();
    } catch (err) {
        throw new Error("Failed to fetch data")
    }
}

export async function getItemBySlug(itemSlug: string) {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/objects/`

    //Definindo o objeto de consulta pelo slug
    const queryParams = new URLSearchParams({
        query: JSON.stringify({
            slug: itemSlug
        }),
        props: 'slug,title,content,metadata',
        read_key: process.env.READ_KEY as string
    })

    const url = `${baseUrl}?${queryParams.toString()}`;

    try {
        const res = await fetch(url, { next: { revalidate: 120 } })

        if (!res.ok) {
            throw new Error("Failed to get item by slug")
        }

        return res.json();
    } catch (err) {
        redirect("/")
    }
}