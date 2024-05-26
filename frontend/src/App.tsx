import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import "@/styles/App.css";

import { api } from "@/lib/api";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotalSpent(data.total);
    }

    fetchTotal();
  }, []);

  return (
    <Card className="w-80 m-auto text-left">
      <CardHeader>
        <CardTitle>Total Spent</CardTitle>
        <CardDescription>The total amount you've spent</CardDescription>
      </CardHeader>
      <CardContent className="text-3xl">{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
