import React from 'react';
import {useNavigate} from 'react-router-dom';

const BookEdit = (props) => {

    const navigate = useNavigate();
    navigate('/home');
    const [formData, updateFormData] = React.useState({
        name: "",
        category: 0,
        author: 0,
        availableCopies: 0,
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !== 0 ? formData.category : props.book.category.id;
        const author = formData.author !== 0 ? formData.author : props.book.author.id;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.product.availableCopies;

        props.onEditProduct(props.product.id, name, category, author, availableCopies);
        history.push("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Category</label>
                        <input type="text"
                               className="form-control"
                               id="category"
                               name="category"
                               placeholder={props.book.category}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}>
                            {props.authors.map((term) => {
                                if(props.book.author !== undefined &&
                                    props.book.author.id === term.id)
                                    return <option selected={props.book.author.id} value={term.id}>{term.name}</option>
                                else return <option value={term.id}>{term.name}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               placeholder={props.book.availableCopies}
                               onChange={handleChange}
                        />
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;
