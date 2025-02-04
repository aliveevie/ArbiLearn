"use client"

import { useState, useEffect } from "react"
import { getAllDatabaseData } from "@/server-comps/getData"
import { Download, X, RefreshCw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "@/styles/AdminDashboard.module.css"

type DataType = "wallets" | "profiles" | "feedback" | "ambassadors" | null

type DataFormatter = {
  [key: string]: {
    label: string;
    format?: (value: any) => string | JSX.Element;
  };
};

const dataFormatters: { [key: string]: DataFormatter } = {
  profiles: {
    name: { label: 'Name' },
    email: { label: 'Email' },
    x_handle: { label: 'Twitter Handle' },
    discord: { label: 'Discord' },
    telegram: { label: 'Telegram' },
    bio: { label: 'Bio' },
    created_at: { 
      label: 'Created At',
      format: (value) => new Date(value).toLocaleDateString()
    }
  },
  feedback: {
    name: { label: 'Name' },
    twitter: { label: 'Twitter' },
    general_feedback: { label: 'General Feedback' },
    satisfaction: { label: 'Satisfaction Level' },
    rating: { 
      label: 'Rating',
      format: (value) => '⭐'.repeat(value)
    },
    smart_account_experience: { label: 'Smart Account Experience' },
    testimony: { label: 'Testimony' },
    created_at: { 
      label: 'Submitted At',
      format: (value) => new Date(value).toLocaleDateString()
    }
  },
  wallets: {
    wallet_address: { label: 'Wallet Address' },
    created_at: { 
      label: 'Created At',
      format: (value) => new Date(value).toLocaleDateString()
    }
  }
};

const AdminDashboard = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeView, setActiveView] = useState<DataType>(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getAllDatabaseData()
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = (type: DataType) => {
    if (!data || !type || !data[type]) return

    const items = data[type] as Record<string, any>[]
    if (!items.length) return
    const headers = Object.keys(items[0])
    const csvContent = [
      headers.join(","),
      ...items.map((item: any) => headers.map((header) => JSON.stringify(item[header] || "")).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${type}_${new Date().toISOString()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const stats = [
    { title: "Total Wallets", value: data?.wallets?.length || 0, type: "wallets" },
    { title: "Total Profiles", value: data?.profiles?.length || 0, type: "profiles" },
    { title: "Total Feedback", value: data?.feedback?.length || 0, type: "feedback" },
    { title: "Total Ambassadors", value: data?.ambassadors?.length || 0, type: "ambassadors" },
    {
      title: "Total Earnings",
      value: `$${data?.ambassadorEarnings?.reduce((acc: number, curr: any) => acc + Number(curr.earnings), 0).toFixed(2)}`,
    },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderDataTable = () => {
    if (!activeView || !data?.[activeView]) return null

    let items = data[activeView]
    if (!items.length) return <p className={styles.noData}>No data available</p>

    const headers = Object.keys(items[0])

    // Apply search filter
    if (searchTerm) {
      items = items.filter((item: any) =>
        Object.values(item).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply sorting
    if (sortColumn) {
      items.sort((a: any, b: any) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return (
      <div className={styles.dataTable}>
        <div className={styles.tableHeader}>
          <h2>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h2>
          <Button onClick={() => downloadCSV(activeView)}>
            <Download className={styles.buttonIcon} />
            Download CSV
          </Button>
        </div>
        <div className={styles.tableControls}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select onChange={(e) => setActiveView(e.target.value as DataType)} className={styles.selectInput}>
            <option value="">Select view</option>
            {stats.map(
              (stat) =>
                stat.type && (
                  <option key={stat.type} value={stat.type}>
                    {stat.title}
                  </option>
                ),
            )}
          </select>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header} onClick={() => handleSort(header)} className={styles.tableHeaderCell}>
                    {header}
                    {sortColumn === header && (
                      <ChevronDown
                        className={`${styles.sortIcon} ${sortDirection === "desc" ? styles.sortIconDesc : ""}`}
                      />
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index} onClick={() => setSelectedItem(item)} className={styles.tableRow}>
                  {headers.map((header) => (
                    <td key={header}>{item[header]?.toString() || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderModalContent = (item: any) => {
    const formatter = dataFormatters[activeView as string];
    if (!formatter) return JSON.stringify(item, null, 2);

    return (
      <div className={styles.modalContent}>
        {Object.entries(item).map(([key, value]) => {
          const format = formatter[key];
          if (!format) return null; // Skip fields that aren't in the formatter

          return (
            <div key={key} className={styles.modalField}>
              <div className={styles.modalLabel}>{format.label}</div>
              <div className={styles.modalValue}>
                {format.format ? format.format(value) : value?.toString() || 'N/A'}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        <h1>Admin Dashboard</h1>
        <Button onClick={fetchData}>
          <RefreshCw className={styles.buttonIcon} />
          Refresh Data
        </Button>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={styles.statCard}
            onClick={() => stat.type && setActiveView(stat.type as DataType)}
          >
            <h3>{stat.title}</h3>
            <div className={styles.statValue}>{stat.value}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <div className={styles.skeletonHeader}></div>
          <div className={styles.skeletonTable}></div>
        </div>
      ) : (
        renderDataTable()
      )}

      {selectedItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={() => setSelectedItem(null)}>
              <X />
            </button>
            <h2 className={styles.modalTitle}>
              {activeView ? `${activeView.charAt(0).toUpperCase()}${activeView.slice(1)} Details` : 'Details'}
            </h2>
            {renderModalContent(selectedItem)}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard;