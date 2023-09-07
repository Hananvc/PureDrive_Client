import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/apiconfig';
import Navbar from "../components/Navbar";
import HeroPages from "../components/HeroPages";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";



const EVNewsFeed = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(8); 
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const defaultImage = 'https://via.placeholder.com/150'; // Placeholder image URL

    const truncateDescription = (description, wordLimit) => {
        const words = description?.split(' ');
        if (words?.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    };


    const handleFetchInitialNews = () => {
        // Make a POST request to the Django view that fetches and stores initial news data
        axiosInstance.post('vehicleapp/fetch-initial-news/')
            .then(response => {
                console.log(response.data.message); // Success message from Django
                // Refresh the news data by making a separate API call
                
            })
            .catch(error => {
                console.error('Error fetching and storing initial news data:', error);
            });
    };

    useEffect(() => {
        // Fetch cached news data from backend API
        axiosInstance.get('vehicleapp/cached-news/')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching cached news data:', error);
            });
    }, []);

    return (
        <>
            <Navbar />
            <HeroPages name="EV News Worldwide"/>
            <div className="flex justify-center items-center my-10 ">
                <div className="">
                    <Typography variant="h5" color="blue-gray" className="font-bold text-5xl text-red-500">
                        Top Global EV news
                    </Typography>
                </div>
            </div>
    
            <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 justify-center items-center mt-10">
                {news.length === 0 ? (
                    <>
                    {/* <p>No news data available. Please check back later.</p>
                    <Button onClick={handleFetchInitialNews} class="">Fetch Initial News Data</Button> */}
                    </>
                ) : (
                    currentArticles.map((article, index) => (
                        <Card key={index} className="m-10 card-container">
                            <CardHeader color="blue-gray" className="relative h-56">
                                <img
                                    src={article.urlToImage || defaultImage}
                                    alt="card-image"
                                    className="object-cover h-full w-full"
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="blue-gray" className="mb-2" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {article.title}
                                </Typography>
                                <Typography style={{ fontSize: '1rem' }}>
                                    {truncateDescription(article.description, 15)}
                                </Typography>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <Button style={{ fontSize: '0.8rem' }}>
                                        Read More
                                    </Button>
                                </a>
                            </CardFooter>
                        </Card>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-8">
                <nav className="block">
                    <ul className="flex pl-0 list-none rounded my-2">
                        <li>
                            <button
                                className={`text-xs font-bold uppercase px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 cta-btn btn-lg ${
                                    currentPage === 1 ? 'bg-gray-300 text-gray-600' : 'bg-blue-100 text-blue-900'
                                }`}
                                type="button"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        <li>
                            <button
                                className={`text-xs font-bold uppercase px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 cta-btn ml-3 btn-lg ${
                                    currentPage === Math.ceil(news.length / articlesPerPage) ? 'bg-gray-300 text-gray-600' : 'bg-blue-100 text-blue-900'
                                }`}
                                type="button"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === Math.ceil(news.length / articlesPerPage)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
              
        </>
    );
};

export default EVNewsFeed;
