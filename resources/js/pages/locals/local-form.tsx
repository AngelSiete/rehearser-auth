import { Form, useForm } from '@inertiajs/react';

export default function LocalForm(){
    const {data, setData, post, processing, errors, reset} = useForm({
        name:'',
        description:'',
        price:''
    });

    return (
        <form>
            <Input id="name"></Input>
        </form>
    )
}
