export const roles = [
    {
        
        value: 'Admin'
    },
    {
        
        value: 'User'
    }
]

export const blockstatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]

export const tourType = [
    'couple',  
    'adventure', 
    'cultural', 
    'family', 
    'luxury',
    'budget'
];

export const sorts = [
    {
        id: 1,
        value: '-sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: '-name',
        text: 'Alphabetically, A-Z'
    },
    {
        id: 3,
        value: 'name',
        text: 'Alphabetically, Z-A'
    },
    {
        id: 4,
        value: '-price',
        text: 'Price, high to low'
    },
    {
        id: 5,
        value: 'price',
        text: 'Price, low to high'
    },
    {
        id: 6,
        value: '-createdAt',
        text: 'Date, new to old'
    },
    {
        id: 7,
        value: 'createdAt',
        text: 'Date, old to new'
    },
];

export const voteOptions = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Neutral'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
];

export const statusBookings =[
    {
        label: 'Cancelled',
        value: 'Cancelled'
    },
    {
        label: 'Success',
        value: 'Success'
    },
]
