"use client"
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useAccount, useBalance } from "@starknet-react/core";
import { shortenAddress } from "./utils";
import { WalletIcon, ActivityIcon, ClockIcon, LockIcon } from "@/components/icons";

interface Transaction {
  hash: string;
  type: string;
  amount: string;
  timestamp: string;
  status: string;
}



function ProfileManagement() {
  const [actionLoading, setActionLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { account } = useAccount();
  const { data: balance } = useBalance({
    address: account?.address as `0x${string}` | undefined, 
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

        {!account ? (
          <div className="text-center py-8 text-gray-500">
            <p>Please connect your wallet to view your profile.</p>
            <Button className="mt-4" onPress={() => alert("Connect wallet logic here")}>
              Connect Wallet
            </Button>
          </div>
        ) : (
          <>
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
                      <div>{shortenAddress(account.address)}</div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileManagement;