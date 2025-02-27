import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children, userName }) {
    const initialBalance = 100000;
    const [balance, setBalance] = useState(initialBalance);
    const [netWorth, setNetWorth] = useState(initialBalance);
    const [portfolio, setPortfolio] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');
    const [yearlyIncome, setYearlyIncome] = useState('');
    const [riskTolerance, setRiskTolerance] = useState('');
    const [accountAge, setAccountAge] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [userPurchases, setUserPurchases] = useState([]);
    const [userTrades, setUserTrades] = useState([]);

    useEffect(() => {
        const storedPortfolio = JSON.parse(localStorage.getItem(`${userName}_portfolio`)) || [];
        setPortfolio(storedPortfolio);
        const storedBalance = parseFloat(localStorage.getItem(`${userName}_balance`)) || initialBalance;
        setBalance(storedBalance);
        const storedNetWorth = parseFloat(localStorage.getItem(`${userName}_netWorth`)) || initialBalance;
        setNetWorth(storedNetWorth);
    }, [userName]);

    useEffect(() => {
        const userProfile = JSON.parse(localStorage.getItem(userName)) || {};
        if (userProfile.phoneNumber) setPhoneNumber(userProfile.phoneNumber);
        if (userProfile.fullName) setFullName(userProfile.fullName);
        if (userProfile.yearlyIncome) setYearlyIncome(userProfile.yearlyIncome);
        if (userProfile.riskTolerance) setRiskTolerance(userProfile.riskTolerance);
        if (userProfile.creationTime) {
            const timeSinceCreation = new Date() - new Date(userProfile.creationTime);
            setAccountAge(Math.floor(timeSinceCreation / (1000 * 60 * 60 * 24)));
        }

        const storedTransactions = JSON.parse(localStorage.getItem('purchases')) || [];
        setTransactions(storedTransactions);
    }, [userName]);

    useEffect(() => {
        const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
        const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
        const storedPurchases = JSON.parse(localStorage.getItem('purchases')) || [];
        setLeaderboard(storedLeaderboard);
        setComments(storedComments);
        setUserPurchases(storedPurchases);
    }, [userName]);

    return (
        <UserContext.Provider value={{
            balance, setBalance,
            netWorth, setNetWorth,
            portfolio, setPortfolio,
            selectedStock, setSelectedStock,
            quantity, setQuantity,
            phoneNumber, setPhoneNumber,
            fullName, setFullName,
            yearlyIncome, setYearlyIncome,
            riskTolerance, setRiskTolerance,
            accountAge, setAccountAge,
            transactions, setTransactions,
            leaderboard, setLeaderboard,
            comments, setComments,
            newComment, setNewComment,
            userPurchases, setUserPurchases,
            userTrades, setUserTrades
        }}>
            {children}
        </UserContext.Provider>
    );
}