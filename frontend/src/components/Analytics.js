import { Progress } from 'antd';

const Analytics = ({ allTransaction }) => {

    const categories = [
        "salary",
        "tip",
        "project",
        "food",
        "movie",
        "bills",
        "medical",
        "fee",
        "tax"
    ];

    // transactions calculation
    const totalTransaction = allTransaction.length;
    const incomeTransaction = allTransaction.filter((transaction) => transaction.type === "income");
    const expenseTransaction = allTransaction.filter((transaction) => transaction.type === "expense");
    const incomePercent = (incomeTransaction.length / totalTransaction) * 100;
    const expensePercent = (expenseTransaction.length / totalTransaction) * 100;

    // total turnover
    const totalTurnover = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
    );
    const totalIncomeTurnover = allTransaction.filter(
        (transaction) => transaction.type === 'income')
        .reduce((acc, transaction) => transaction.amount + acc, 0);
    const totalExpenseTurnover = allTransaction.filter(
        (transaction) => transaction.type === 'expense')
        .reduce((acc, transaction) => transaction.amount + acc, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row gx-4 gy-4">
                    {/* TOTAL TRANSACTIONS */}
                    <div className="col-md-3">
                        <div className="card shadow">
                            <div className="card-header text-primary fw-semibold fs-5 text-center">
                                TOTAL TRANSACTIONS: {totalTransaction}
                            </div>
                            <div className="card-body d-flex justify-content-around">
                                <div className="text-center">
                                    <h6 className="text-success">INCOME</h6>
                                    <Progress type="circle" percent={incomePercent.toFixed(0)} strokeColor="green" />
                                    <p className="fw-bold mt-2">{incomeTransaction.length}</p>
                                </div>
                                <div className="text-center">
                                    <h6 className="text-danger">EXPENSE</h6>
                                    <Progress type="circle" percent={expensePercent.toFixed(0)} strokeColor="red" />
                                    <p className="fw-bold mt-2">{expenseTransaction.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* TOTAL TURNOVER */}
                    <div className="col-md-3">
                        <div className="card shadow">
                            <div className="card-header text-primary fw-semibold fs-5 text-center">
                                TOTAL TURNOVER: {totalTurnover}
                            </div>
                            <div className="card-body d-flex justify-content-around">
                                <div className="text-center">
                                    <h6 className="text-success">INCOME</h6>
                                    <Progress type="circle" percent={totalIncomeTurnoverPercent.toFixed(0)} strokeColor="green" />
                                    <p className="fw-bold mt-2">{totalIncomeTurnover}</p>
                                </div>
                                <div className="text-center">
                                    <h6 className="text-danger">EXPENSE</h6>
                                    <Progress type="circle" percent={totalExpenseTurnoverPercent.toFixed(0)} strokeColor="red" />
                                    <p className="fw-bold mt-2">{totalExpenseTurnover}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CATEGORYWISE INCOME */}
                    <div className="col-md-3">
                        <div className="card shadow">
                            <div className="card-header text-primary fw-semibold fs-5 text-center">
                                CATEGORYWISE INCOME
                            </div>
                            <div className="card-body">
                                {categories.map(category => {
                                    const amount = allTransaction
                                        .filter(txn => txn.type === 'income' && txn.category === category)
                                        .reduce((acc, txn) => acc + txn.amount, 0);

                                    return amount > 0 && (
                                        <div key={category} className="mb-2">
                                            <h6 className="mb-1">{category.toUpperCase()}</h6>
                                            <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} strokeColor="green" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* CATEGORYWISE EXPENSE */}
                    <div className="col-md-3">
                        <div className="card shadow">
                            <div className="card-header text-primary fw-semibold fs-5 text-center">
                                CATEGORYWISE EXPENSE
                            </div>
                            <div className="card-body">
                                {categories.map(category => {
                                    const amount = allTransaction
                                        .filter(txn => txn.type === 'expense' && txn.category === category)
                                        .reduce((acc, txn) => acc + txn.amount, 0);

                                    return amount > 0 && (
                                        <div key={category} className="mb-2">
                                            <h6 className="mb-1">{category.toUpperCase()}</h6>
                                            <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} strokeColor="red" />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics