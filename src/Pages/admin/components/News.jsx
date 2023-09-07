import { Card, Typography,Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { SidebarWithSearch } from "./sidebar";
import React, { useState, useEffect } from 'react';
import axiosInstance from "../../../api/apiconfig";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../loader";


export default function News() {
    const [News, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const handleFetchInitialNews = () => {
        setLoading(true);
        // Make a POST request to the Django view that fetches and stores initial news data
        axiosInstance.post('vehicleapp/fetch-initial-news/')
            .then(response => {
                setLoading(false);
                console.log(response.data.message); // Success message from Django
                toast.success("News Refreshed Successfully")
                fetchData();
                // Refresh the news data by making a separate API call
                
            })
            .catch(error => {
                console.error('Error fetching and storing initial news data:', error);
                toast.error("News Fetching Error")
                
            });
    };

    const handleDeleteButtonClick = (newsId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this category?");
        if (shouldDelete) {
            deleteNews(newsId);
        }
      };
      
      const deleteNews = async (newsId) => {
        try {
          await axiosInstance.delete(`/adminapp/news/${newsId}/`);
          toast.success("News Article deleted successfully");
          fetchData(); // Refresh the category list after deletion
        } catch (error) {
          console.error('Error deleting News:', error);
          toast.error("Error in News Article deletion");
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const newsData = await fetchNews();
            setNews(newsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }

    async function fetchNews() {
        try {
            const response = await axiosInstance.get('/adminapp/news/');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    }

console.log("News data is ",News);
    return (
        <div className="flex ">
            <SidebarWithSearch />
            {loading ? <>
            <Loader/>
            </>:
            <>
            <div className="my-96 -ml-20 w-8/12">
                <Card className="w-auto h-auto overflow-scroll ml-48 my-20 card-container">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th>
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="font-extrabold leading-none opacity-70 content-center mb-10 my-5 "
                                    style={{ fontSize: '200.5%' }}
                                >
                                    News
                                </Typography>
                                </th>
                                <th>
                                <Button
                    className="flex  gap-3 font-bold text-black "
                    color="blue"
                    size="lg"
                    onClick={handleFetchInitialNews}
                    >
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Refresh News FEED
                    </Button>
                                </th>
        
                            </tr>
                            
                        </thead>
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                        style={{ fontSize: '135.5%' }}
                                    >
                                        Title
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Image</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Name</th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">Action</th>

                                
                            </tr>
                        </thead>
                        <tbody>
                            {News.map((news) => (
                                <tr key={news.id}>
                                    <td className="p-4 border-b border-blue-gray-50">
                                        <Typography variant="small" color="blue-gray" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            {news.title.split(' ').slice(0, 10).join(' ')}....
                                        </Typography>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <a href={news.url_to_image} target="_blank" rel="noopener noreferrer">
                                        <img
                                        src={news.url_to_image}
                                        alt=""
                                        className="w-20 h-18 rounded-full cursor-pointer"
                                        />
                                    </a>
                                    </td>
                                    <td className="p-4 border-b border-blue-gray-50">
                                    <Link to={news.url} target="_blank" rel="noopener noreferrer">
                                        <Typography variant="small" color="blue" className="font-bold" style={{ fontSize: '115.5%' }}>
                                            Read it Here.
                                        </Typography>
                                    </Link>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Button
                                        color="red"
                                        onClick={() => handleDeleteButtonClick(news.id)}
                                        
                                    >
                                        Delete
                                    </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </Card>
            </div>
            </>}
        </div>
    );
}

