"use server"
const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const createProject = async (newProject) =>{
    const res = await fetch(`${baseURL}/api/projects`, {
        method: 'POST',
        headers: {
            'Content-type' : 'application/json',
        },
        body: JSON.stringify(newProject)
    })

    return res.json()
}