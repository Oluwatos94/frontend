"use client"
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Divider, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useAccount, useBalance } from "@starknet-react/core";
import { shortenAddress } from "@/app/utils";

interface Transaction {
  hash: string;
  type: string;
  amount: string;
  timestamp: string;
  status: string;
}

const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z"></path>
    <path d="M16 12h4"></path>
  </svg>
);

const ActivityIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

function ProfileManagement() {
  const [actionLoading, setActionLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { account } = useAccount();
  const { data: balance } = useBalance({
    address: account?.address,
    watch: true,
  });

  useEffect(() => {
    console.log(account);
    console.log(balance);
  }, [account, balance]);

  const handleLock = async (): Promise<void> => {
    setActionLoading(true);
    try {
      // Implement locking mechanism
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Lock failed:", error);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    if (account?.address) {
      const mockTransactions: Transaction[] = [
        {
          hash: "0x123...abc",
          type: "Transfer",
          amount: "0.1 STRK",
          timestamp: "2024-03-17 10:30:00",
          status: "Completed"
        },
        {
          hash: "0x456...def",
          type: "Recieved",
          amount: "0.5 STRK",
          timestamp: "2024-03-17 09:15:00",
          status: "Completed"
        }
      ];
      setTransactions(mockTransactions);
    }
  }, [account?.address]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col items-center gap-y-4 p-4">
        <header className="font-bold text-2xl">StarkNet Profile</header>
        <div className="text-center text-balance">Manage your StarkNet account, view balances and transactions</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
          <Card className="p-4">
            <CardHeader className="flex items-center gap-2">
              <WalletIcon />
              <span className="font-bold">Account Details</span>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-y-4">
                <div className="break-all">
                  <div className="text-sm text-gray-500">Address</div>
                  <div>{account?.address ? shortenAddress(account.address) : "Not connected"}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Balance</div>
                  <div>{balance ? `${balance.formatted} ${balance.symbol}` : "0"}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LockIcon />
                    <span>Account Status</span>
                  </div>
                  <span className="text-green-500">Active</span>
                </div>
                <Button
                  color="danger"
                  isLoading={actionLoading}
                  disabled={actionLoading}
                  onPress={handleLock}
                  className="mt-4"
                >
                  Lock Account
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card className="p-4">
            <CardHeader className="flex items-center gap-2">
              <ActivityIcon />
              <span className="font-bold">Activity Overview</span>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Transactions</span>
                  <span className="font-bold">{transactions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last Activity</span>
                  <span className="font-bold">
                    {transactions[0]?.timestamp || "No activity"}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="w-full p-4 mt-4">
          <CardHeader className="flex items-center gap-2">
            <ClockIcon />
            <span className="font-bold">Recent Transactions</span>
          </CardHeader>
          <CardBody>
            {transactions.length > 0 ? (
              <div className="overflow-x-auto">
                <Table aria-label="Transaction history">
                  <TableHeader>
                    <TableColumn>HASH</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>AMOUNT</TableColumn>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx: Transaction) => (
                      <TableRow key={tx.hash}>
                        <TableCell>{tx.hash}</TableCell>
                        <TableCell>{tx.type}</TableCell>
                        <TableCell>{tx.amount}</TableCell>
                        <TableCell>{tx.timestamp}</TableCell>
                        <TableCell>
                          <span className="text-green-500">{tx.status}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions found
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default ProfileManagement;