"use client"

import { useState, useEffect, type JSX } from "react";
import { getAllDatabaseData, approveVerification, rejectVerification } from "@/server-comps/getData"
import { Download, X, RefreshCw, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import styles from "@/styles/AdminDashboard.module.css"

type DataType = "wallets" | "profiles" | "feedback" | "ambassadors" | "courseVerifications" | null

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
  },
  courseVerifications: {
    resource_name: { label: 'Resource Name' },
    resource_type: { label: 'Resource Type' },
    resource_size: { label: 'Resource Size' },
    completion_type: { label: 'Completion Type' },
    details: { label: 'Details' },
    evidence_url: { 
      label: 'Evidence',
      format: (value) => <img src={value} alt="Evidence" className={styles.evidenceImage} style={{maxWidth: '200px'}} />
    },
    wallet_address: { label: 'Wallet Address' },
    status: { 
      label: 'Status',
      format: (value) => (
        <span className={`${styles.status} ${styles[value]}`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    created_at: { 
      label: 'Submitted At',
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getAllDatabaseData()
      console.log(result)
      if (result.success) {
        setData(result.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USER &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.loginForm}>
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    )
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
    { title: "Pending Verifications", value: data?.courseVerifications?.filter((v: any) => v.status === 'pending').length || 0, type: "courseVerifications" },
    { title: "Total Feedback", value: data?.feedback?.length || 0, type: "feedback" },
    { title: "Total Ambassadors", value: data?.ambassadors?.length || 0, type: "ambassadors" },
    { title: "Total Profiles", value: data?.profiles?.length || 0, type: "profiles" },
  ]

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const renderVerificationActions = (item: any) => {
    if (activeView !== 'courseVerifications') return null;
  
    const handleApprove = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const result = await approveVerification(item.wallet_address);
            if (result.success) {
                fetchData();
                alert('Verification approved successfully');
            } else {
                alert('Failed to approve verification');
            }
        } catch (error) {
            console.error('Error approving verification:', error);
            alert('Error approving verification');
        }
    };

    const handleReject = async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const result = await rejectVerification(item.wallet_address);
            if (result.success) {
                fetchData();
                alert('Verification rejected successfully');
            } else {
                alert('Failed to reject verification');
            }
        } catch (error) {
            console.error('Error rejecting verification:', error);
            alert('Error rejecting verification');
        }
    };
  
    return (
        <div className={styles.verificationActions}>
            <Button 
                onClick={handleApprove}
                disabled={item.status !== 'pending'}
            >
                Approve
            </Button>
            <Button 
                onClick={handleReject}
                variant="destructive"
                disabled={item.status !== 'pending'}
            >
                Reject
            </Button>
        </div>
    );
};

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
                {activeView === 'courseVerifications' && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((item: any, index: number) => (
                <tr key={index} onClick={() => setSelectedItem(item)} className={styles.tableRow}>
                  {headers.map((header) => (
                    <td key={header}>
                      {activeView === 'courseVerifications' && header === 'evidence_url' ? (
                        <img src={item[header]} alt="Evidence" style={{maxWidth: '50px'}} />
                      ) : (
                        item[header]?.toString() || ""
                      )}
                    </td>
                  ))}
                  {activeView === 'courseVerifications' && (
                    <td>{renderVerificationActions(item)}</td>
                  )}
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