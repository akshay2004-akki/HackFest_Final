import React from 'react';


const rewardsList = [
  { category: 'Eco-Friendly Products', items: [
    { id: 1, name: 'Reusable Water Bottle', description: 'Eco-friendly and durable.', points: 50 },
    { id: 2, name: 'Bamboo Toothbrush', description: 'Biodegradable and sustainable.', points: 30 },
    { id: 3, name: 'Organic Cotton Tote Bag', description: 'Reusable and stylish.', points: 40 },
    { id: 4, name: 'Stainless Steel Straw', description: 'Reduce plastic waste.', points: 20 },
    { id: 5, name: 'Solar-Powered Phone Charger', description: 'Harness the power of the sun.', points: 100 },
  ]},
  { category: 'Discounts and Coupons', items: [
    { id: 6, name: 'Discounts on Eco-Friendly Brands', description: 'Save on sustainable products.', points: 50 },
    { id: 7, name: 'Coupons for Organic Grocery Stores', description: 'Shop healthy and organic.', points: 30 },
    { id: 8, name: 'Vouchers for Local Farmers\' Markets', description: 'Fresh and local produce.', points: 40 },
    { id: 9, name: 'Discounted Memberships to Environmental Organizations', description: 'Support eco-initiatives.', points: 20 },
  ]},
  { category: 'Experiences and Services', items: [
    { id: 10, name: 'Guided Nature Hikes or Eco-Tours', description: 'Explore the outdoors.', points: 50 },
    { id: 11, name: 'Yoga or Wellness Class Passes', description: 'Enhance your well-being.', points: 30 },
    { id: 12, name: 'Tree Planting Experiences', description: 'Plant trees and make a difference.', points: 40 },
    { id: 13, name: 'Composting Workshops', description: 'Learn to compost effectively.', points: 20 },
    { id: 14, name: 'Community Garden Memberships', description: 'Grow your own food.', points: 50 },
  ]},
  { category: 'Gift Cards', items: [
    { id: 15, name: 'Gift Cards for Eco-Conscious Stores', description: 'Shop sustainably.', points: 50 },
    { id: 16, name: 'Online Store Credits for Sustainable Products', description: 'Buy green products.', points: 30 },
    { id: 17, name: 'Restaurant Vouchers for Farm-to-Table Dining', description: 'Enjoy organic meals.', points: 40 },
  ]},
  { category: 'Home and Garden', items: [
    { id: 18, name: 'Seed Packets for Home Gardening', description: 'Grow your own plants.', points: 20 },
    { id: 19, name: 'Compost Bins', description: 'Reduce waste.', points: 50 },
    { id: 20, name: 'Energy-Efficient Light Bulbs', description: 'Save energy.', points: 30 },
    { id: 21, name: 'Indoor Plant Sets', description: 'Enhance your indoor space.', points: 40 },
    { id: 22, name: 'Rainwater Collection Systems', description: 'Conserve water.', points: 100 },
  ]},
  { category: 'Travel and Transportation', items: [
    { id: 23, name: 'Public Transportation Passes', description: 'Commute sustainably.', points: 50 },
    { id: 24, name: 'Bike-Sharing Program Memberships', description: 'Ride green.', points: 30 },
    { id: 25, name: 'Electric Vehicle Charging Credits', description: 'Charge your EV.', points: 40 },
    { id: 26, name: 'Carpooling Service Credits', description: 'Share rides.', points: 20 },
  ]},
  { category: 'Education and Learning', items: [
    { id: 27, name: 'Subscriptions to Environmental Magazines', description: 'Stay informed.', points: 50 },
    { id: 28, name: 'Online Courses on Sustainability', description: 'Learn about sustainability.', points: 30 },
    { id: 29, name: 'Books on Green Living and Environmental Science', description: 'Read and learn.', points: 40 },
  ]},
  { category: 'Charity Donations', items: [
    { id: 30, name: 'Donations to Environmental Charities', description: 'Support eco-causes.', points: 50 },
    { id: 31, name: 'Contributions to Wildlife Conservation Projects', description: 'Protect wildlife.', points: 30 },
    { id: 32, name: 'Funding Renewable Energy Initiatives', description: 'Support green energy.', points: 40 },
  ]},
  { category: 'Technology and Gadgets', items: [
    { id: 33, name: 'Eco-Friendly Phone Cases', description: 'Protect your phone sustainably.', points: 20 },
    { id: 34, name: 'Solar-Powered Gadgets', description: 'Use renewable energy.', points: 50 },
    { id: 35, name: 'Energy-Saving Smart Home Devices', description: 'Save energy at home.', points: 100 },
    { id: 36, name: 'Recycled Material Tech Accessories', description: 'Eco-friendly tech.', points: 30 },
  ]},
  { category: 'Wellness and Personal Care', items: [
    { id: 37, name: 'Organic Skincare Products', description: 'Care for your skin naturally.', points: 50 },
    { id: 38, name: 'Eco-Friendly Personal Care Items', description: 'Sustainable self-care.', points: 30 },
    { id: 39, name: 'Natural Wellness Products', description: 'Improve your well-being.', points: 40 },
    { id: 40, name: 'Sustainable Fashion Items', description: 'Eco-friendly clothing.', points: 20 },
  ]},
];

function Rewards() {

    const credit = JSON.parse(localStorage.getItem('credit'));
  return (
    <div className="rewards-container">
      {rewardsList.map((category, catIndex) => (
        <div key={catIndex} className="category-section">
          <h2 className="category-title">{category.category}</h2>
          <div className="rewards-grid">
            {category.items.map(reward => (
              reward.points<=credit && (<div key={reward.id} className="reward-box">
                <div className="reward-content">
                  <h3 className="reward-name">{reward.name}</h3>
                  <p className="reward-description">{reward.description}</p>
                  <p className="reward-points">{reward.points} Points</p>
                </div>
              </div>)
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rewards;
