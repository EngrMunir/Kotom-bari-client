import { useLoaderData, useParams } from "react-router-dom";
import SectionTitle from "../../../Component/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {

    const item = useLoaderData();
    const {name, category, recipe, price, _id, image} = useLoaderData();
    console.log('data of update item : ', item);
    const { register, handleSubmit, reset } = useForm();

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
        
    const onSubmit = async(data) => {
      console.log(data);
      // image upload to imagebb and then get an url
      const imageFile = {image: data.image[0] }
      const res = await axiosPublic.post(image_hosting_api, imageFile,{
          headers:{
              'content-type':'multipart/form-data'
          }
      });
      if(res.data.success){
          const menuItem = {
              name: data.name,
              category: data.category,
              price: parseFloat(data.float),
              image: res.data.data.display_url
          }
          const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
          console.log(menuRes.data);
          if(menuRes.data.modifiedCount >0){
            //   reset();
              Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: `${data.name} is updated to the menu`,
                  showConfirmButton: false,
                  timer: 1500
                });
          }
      }
      console.log('with image url',res.data);
    };
    return (
        <div>
            <SectionTitle heading="Update An Item" subHeading="Refresh Info"></SectionTitle>
            <div>
                 <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input 
                        type="text" defaultValue={name} {...register('name', {required:true})} required
                        placeholder="Recipe Name" className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category", {required:true})} required
                            className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input 
                            type="text" defaultValue={price} {...register('price', {required:true})} required
                            placeholder="Price" className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe}  {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Recipe details"></textarea>
                    </div>
                    <div className="form-control w-full my-6">
                        <input defaultValue={image} {...register('image', {required:true})} required type="file" className="file-input file-input-bordered max-w-xs" />
                    </div>
                    <button className="btn">
                        Update Menu Item 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;