import SectionTitle from "../../Component/SectionTitle/SectionTitle";
import featuredImg from "../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white pt-8 my-20">
            <SectionTitle heading="Featured Item" subHeading="check it out"></SectionTitle>
            <div className="md:flex justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-36">
                <div>
                <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2024</p>
                    <p className="uppercase">where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Ipsa odio, nisi aliquam aut culpa perferendis eum nihil 
                        commodi fugit similique unde veniam minima laboriosam quis 
                        quod at obcaecati ipsum. Facere?</p>
                        <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;