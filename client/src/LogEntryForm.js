import react, { useState } from 'react';
import { useForm } from "react-hook-form";

import { createLogEntry } from './API';


const LogEntryForm = ({ location, onClose }) => {

        const { register, handleSubmit} = useForm();
        const [ loading, setLoading ] = useState(false);
        const [ error, setError ] = useState('');

        const onSubmit = async (formData) => {
            try {
                setLoading(true);
                formData.latitude = location.latitude;
                formData.longitude = location.longitude;
                const created = await createLogEntry(formData);
                console.log(created);
                onClose();
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
            
        };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
            { error ? <h4 className="error">{error}</h4> : null }
            <input name="title" placeholder="Title" required ref={register}></input>
            <textarea name="comments" placeholder="Comments" rows={3} ref={register}></textarea>
            <textarea name="description" placeholder="Description" rows={3} ref={register}></textarea>
            <input name="image" placeholder="Image" ref={register}></input>
            <input name="visitDate" placeholder="Visit Date" type="date" required ref={register}></input>
            <button disabled={loading}> { loading ? 'Loading...' : 'Create Log Entry' } </button>
        </form>
    )
};

export default LogEntryForm;