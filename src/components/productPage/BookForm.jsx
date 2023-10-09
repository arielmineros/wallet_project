import { useForm } from "react-hook-form";
import "./BookForm.css";
import { useBook } from "../../context/BookContext";

function BookForm() {
    const { register, handleSubmit } = useForm();
    const { books } = useBook();
    console.log(books);
    const onSubmit = handleSubmit((data) => {
        //createBook(data);
    });
    return (
        <>
            <form onSubmit={onSubmit} id="form-book">
                <input
                    type="text"
                    id="input-book"
                    placeholder="Título"
                    {...register("title")}
                    autoFocus
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Temas"
                    {...register("topic")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Edición"
                    {...register("edition")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="ISBN"
                    {...register("isbn")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Datos de publicación"
                    {...register("publishingDetails")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Datos de serie"
                    {...register("serieDetails")}
                />
                <input
                    type="text"
                    id="input-book"
                    placeholder="Autor"
                    {...register("author")}
                />
                <input
                    type="file"
                    id="input-img"
                    placeholder="Agregar imagen"
                />
                <textarea
                    name=""
                    placeholder="Descripción"
                    {...register("description")}
                    id=""
                ></textarea>

                <button>Guardar</button>
            </form>
        </>
    );
}
export default BookForm;
