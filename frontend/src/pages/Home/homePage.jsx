import React from 'react';
import "./homePage.css"

const HomePage = () => {
  
return(

<>  
            <div className='homepageContent'>
                <h1>Welcome to Nest Bank</h1>
                <p className='description'>
                    Pay Sprint is your ultimate invoicing solution, 
                    designed to make managing your finances easier and more efficient. 
                    Our app is continuously evolving, bringing you the best tools to 
                    streamline your invoicing process.
                </p>
                <p className='description'></p>
                    Features of Pay Sprint include:
                    <ul className='description'>
                        <li>Easy invoice creation and management</li>
                        <li>Detailed credit note handling</li>
                        <li>Real-time updates and notifications</li>
                        <li>Secure data storage and backup</li>
                        <li>User-friendly interface and customization options</li>
                    </ul>

                <blockquote className='quote'>
                    "The best way to predict the future is to create it." - Peter Drucker
                </blockquote>
            </div>
            
</>

)
}

export default HomePage;