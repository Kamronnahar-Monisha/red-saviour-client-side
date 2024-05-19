import { toast } from "react-hot-toast";

const addReport = (report) => {
    fetch('https://red-saviour-server-side.onrender.com/report', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(report)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            toast.success('Successfully added a report .');
        })
        .catch(error=>console.log(error));
}

export { addReport };