import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Chart, LinearScale, CategoryScale, BarElement } from "chart.js";

Chart.register(LinearScale, CategoryScale, BarElement);

const SalesOverview = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get("/api/v1/auth/sales-overview");
        setSalesData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales overview:", error);
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Data for the bar chart
  const chartData = {
    labels: ["Total Revenue", "Order Count"],
    datasets: [
      {
        label: "Sales Data",
        backgroundColor: ["#3498db", "#e74c3c"],
        borderColor: "#2c3e50",
        borderWidth: 1,
        hoverBackgroundColor: ["#2980b9", "#c0392b"],
        hoverBorderColor: "#34495e",
        data: [salesData?.totalRevenue, salesData?.orderCount],
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Layout>
      <div className="sales-overview-container row mt-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="m-3 sales-card">
            <div className="card-body">
              <h4 className="card-title text-left mb-4 mt-4">Sales Overview</h4>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <Bar data={chartData} options={chartOptions} />
                  {salesData?.mostSoldProduct && (
                    <div>
                      <h4
                        className="mb-2"
                        style={{
                          textDecoration: "underline",
                          color: "palevioletred",
                        }}
                      >
                        Most Sold Product:
                      </h4>
                      <h5 className="mb-2">
                        Name: {salesData.mostSoldProduct.name}
                      </h5>
                      <p>
                        Quantity Sold: {salesData.mostSoldProduct.quantitySold}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SalesOverview;
