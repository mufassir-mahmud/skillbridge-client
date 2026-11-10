const baseURL = process.env.NEXT_PUBLIC_BASE_URL
export const getClientProjects = async(clientId, status ="active")=>{
    const res = await fetch(`${baseURL}/api/projects?clientId=${clientId}&status=${status}`);
    return res.json()
}