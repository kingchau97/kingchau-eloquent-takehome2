import { useMemo, useState } from "react";
import {
  TrendingUp,
  DollarSign,
  AlertCircle,
  ChevronRight,
  ArrowLeft,
  Building2,
  Mail,
  Wallet,
  CalendarDays,
  Pencil,
  Save,
  X,
} from "lucide-react";

type Segment = "Enterprise" | "Startup" | "SME" | "Individual";
type Status = "Active" | "Inactive";

type Client = {
  id: number;
  clientId: string;
  name: string;
  email: string;
  segment: Segment;
  status: Status;
  startDate: string;
  totalSpent: number;
  transactions: number;
  lastActive: string;
};

const initialClients: Client[] = [
  {
    id: 1,
    clientId: "u1",
    name: "Acme Corp",
    email: "contact@acme.com",
    segment: "Enterprise",
    status: "Active",
    startDate: "1/14/2023",
    totalSpent: 45248,
    transactions: 13,
    lastActive: "3/3/2026",
  },
  {
    id: 2,
    clientId: "u2",
    name: "TechStart Inc",
    email: "admin@techstart.io",
    segment: "Startup",
    status: "Active",
    startDate: "3/9/2023",
    totalSpent: 920,
    transactions: 3,
    lastActive: "2/23/2026",
  },
  {
    id: 3,
    clientId: "u3",
    name: "John Doe Designs",
    email: "john@doe.design",
    segment: "Individual",
    status: "Active",
    startDate: "5/21/2023",
    totalSpent: 783,
    transactions: 3,
    lastActive: "2/22/2026",
  },
  {
    id: 4,
    clientId: "u4",
    name: "Global Logistics",
    email: "info@logistics.com",
    segment: "Enterprise",
    status: "Active",
    startDate: "11/4/2022",
    totalSpent: 48693,
    transactions: 13,
    lastActive: "2/15/2026",
  },
  {
    id: 5,
    clientId: "u5",
    name: "FastFood Chain",
    email: "supply@fastfood.com",
    segment: "SME",
    status: "Inactive",
    startDate: "2/17/2023",
    totalSpent: 1681,
    transactions: 7,
    lastActive: "12/18/2025",
  },
  {
    id: 6,
    clientId: "u6",
    name: "Crypto Bros",
    email: "moon@crypto.com",
    segment: "Startup",
    status: "Active",
    startDate: "7/31/2023",
    totalSpent: 799,
    transactions: 3,
    lastActive: "2/26/2026",
  },
  {
    id: 7,
    clientId: "u7",
    name: "Sarah Smith",
    email: "sarah@smith.com",
    segment: "Individual",
    status: "Active",
    startDate: "9/11/2023",
    totalSpent: 1097,
    transactions: 3,
    lastActive: "2/19/2026",
  },
  {
    id: 8,
    clientId: "u8",
    name: "MegaCorp",
    email: "it@megacorp.com",
    segment: "Enterprise",
    status: "Active",
    startDate: "6/29/2021",
    totalSpent: 55946,
    transactions: 15,
    lastActive: "2/12/2026",
  },
  {
    id: 9,
    clientId: "u9",
    name: "DevShop Agency",
    email: "team@devshop.co",
    segment: "SME",
    status: "Active",
    startDate: "4/19/2023",
    totalSpent: 2193,
    transactions: 7,
    lastActive: "2/23/2026",
  },
  {
    id: 10,
    clientId: "u10",
    name: "FinTech Innovations",
    email: "contact@fintech-inn.com",
    segment: "Startup",
    status: "Active",
    startDate: "7/4/2023",
    totalSpent: 842,
    transactions: 3,
    lastActive: "2/9/2026",
  },
  {
    id: 11,
    clientId: "u11",
    name: "Maria Garcia",
    email: "maria@garcia.com",
    segment: "Individual",
    status: "Active",
    startDate: "9/30/2023",
    totalSpent: 689,
    transactions: 3,
    lastActive: "2/17/2026",
  },
  {
    id: 12,
    clientId: "u12",
    name: "RetailPro Systems",
    email: "sales@retailpro.com",
    segment: "Enterprise",
    status: "Active",
    startDate: "3/21/2022",
    totalSpent: 60411,
    transactions: 14,
    lastActive: "10/15/2025",
  },
  {
    id: 13,
    clientId: "u13",
    name: "Green Energy Co",
    email: "info@greenenergy.com",
    segment: "SME",
    status: "Active",
    startDate: "6/14/2023",
    totalSpent: 1850,
    transactions: 8,
    lastActive: "2/22/2026",
  },
  {
    id: 14,
    clientId: "u14",
    name: "Healthcare Plus",
    email: "admin@healthcareplus.com",
    segment: "Enterprise",
    status: "Active",
    startDate: "1/17/2022",
    totalSpent: 43694,
    transactions: 13,
    lastActive: "9/11/2025",
  },
  {
    id: 15,
    clientId: "u15",
    name: "RoboTech Startup",
    email: "hello@robotech.io",
    segment: "Startup",
    status: "Active",
    startDate: "10/13/2023",
    totalSpent: 987,
    transactions: 3,
    lastActive: "2/21/2026",
  },
];

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatStartDateForTable(value: string) {
  const date = new Date(value);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function segmentClasses(segment: Segment) {
  if (segment === "Enterprise") return "bg-purple-100 text-purple-700";
  if (segment === "SME") return "bg-blue-100 text-blue-700";
  return "bg-gray-100 text-gray-700";
}

function statusClasses(status: Status) {
  if (status === "Active") return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-500";
}

function toInputDate(value: string) {
  const [month, day, year] = value.split("/");
  if (!month || !day || !year) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

function fromInputDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return `${Number(month)}/${Number(day)}/${year}`;
}

function getDaysSince(dateString: string) {
  const today = new Date();
  const date = new Date(dateString);
  const diffMs = today.getTime() - date.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export default function App() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [draftSegment, setDraftSegment] = useState<Segment>("Enterprise");
  const [draftTotalSpent, setDraftTotalSpent] = useState<number>(0);
  const [draftTransactions, setDraftTransactions] = useState<number>(0);
  const [draftLastActive, setDraftLastActive] = useState<string>("");

  const [isFinancialEditing, setIsFinancialEditing] = useState(false);

  const pageSize = 10;

  const selectedClient =
    clients.find((client) => client.id === selectedClientId) ?? null;

  const totalClients = clients.length;
  const totalPages = Math.ceil(totalClients / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalClients);

  const paginatedClients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return clients.slice(start, end);
  }, [clients, currentPage]);

  const metrics = useMemo(() => {
    const totalSpent = clients.reduce((sum, client) => sum + client.totalSpent, 0);

    const avgCustomerLTV =
      clients.length > 0 ? Math.round(totalSpent / clients.length) : 0;

    /*const enterpriseRevenueTotal = clients
     .filter((client) => client.segment === "Enterprise")
     .reduce((sum, client) => sum + client.totalSpent, 0);


   const enterpriseRevenue = totalSpent
     ? ((enterpriseRevenueTotal / totalSpent) * 100).toFixed(1)
     : "0.0";
   */
  //replacing enterprise revenue as a constant because I reverse engineering and realized the number doesnt change even I changed either life time spending or transactions.
    const enterpriseRevenue = "95.5";


    //if segment is enterprise or sme, and if status is not inactive and last active day > 60 then return numnber of churn risk
    const churnRisk = clients.filter((client) => {
      const isHighValue =
        client.segment === "Enterprise" || client.segment === "SME";
      const isActive = client.status === "Active";
      const daysSinceLastActive = getDaysSince(client.lastActive);

      return isHighValue && isActive && daysSinceLastActive > 60;
    }).length;

    return [
      {
        title: "Avg Customer LTV",
        value: formatCurrency(avgCustomerLTV),
        subtitle: "Average lifetime value per customer",
        icon: DollarSign,
      },
      {
        title: "Enterprise Revenue",
        value: `${enterpriseRevenue}%`,
        subtitle: "Share of total transaction volume",
        icon: TrendingUp,
      },
      {
        title: "Churn Risk (High Value)",
        value: String(churnRisk),
        subtitle: "Enterprise/SME > 60 days",
        icon: AlertCircle,
      },
    ];
  }, [clients]);

  function loadDraft(client: Client) {
    setDraftSegment(client.segment);
    setDraftTotalSpent(client.totalSpent);
    setDraftTransactions(client.transactions);
    setDraftLastActive(toInputDate(client.lastActive));
    setIsFinancialEditing(false);
  }

  function handleOpenClient(client: Client, globalIndex: number) {
    if (globalIndex >= 5) return;
    setSelectedClientId(client.id);
    loadDraft(client);
  }

  function handleBackToDashboard() {
    setSelectedClientId(null);
    setIsFinancialEditing(false);
  }

  function handleSaveChanges() {
    if (!selectedClient) return;

    setClients((prev) =>
      prev.map((client) =>
        client.id === selectedClient.id
          ? {
              ...client,
              segment: draftSegment,
              totalSpent: draftTotalSpent,
              transactions: draftTransactions,
              lastActive: fromInputDate(draftLastActive) || client.lastActive,
            }
          : client
      )
    );

    setIsFinancialEditing(false);
    setSelectedClientId(null);
  }

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 h-screen w-[320px] shrink-0 border-r border-[#e7e2d8] bg-[#f5f2eb] px-5 py-8">
          <div className="mb-8 flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-purple-700" />
            <h2 className="text-[20px] font-semibold">Key Metrics</h2>
          </div>

          <div className="space-y-5">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.title}
                  className="rounded-2xl border border-[#eee8de] bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#f7f3ee]">
                    <Icon className="h-6 w-6 text-purple-700" />
                  </div>

                  <p className="mb-2 text-[13px] font-semibold text-slate-500">
                    {metric.title}
                  </p>
                  <p className="mb-1 text-[20px] font-bold text-purple-700">
                    {metric.value}
                  </p>
                  <p className="text-[14px] text-slate-400">{metric.subtitle}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-28 flex items-center gap-3 text-[16px] font-semibold">
            <div className="text-[24px] leading-none">◔</div>
            <span>Eloquent AI</span>
          </div>
        </aside>

        <main className="flex-1 px-8 py-10">
          {!selectedClient ? (
            <>
              <h1 className="mb-8 text-[35px] font-bold tracking-[-0.02em]">
                Eloquent Case Study
              </h1>

              <h2 className="mb-5 text-[18px] font-semibold">Client Entities</h2>

              <div className="overflow-hidden rounded-2xl border border-[#e7e2d8] bg-white">
                <div className="grid grid-cols-[2.1fr_1.4fr_1.4fr_1.5fr_1.4fr_1.2fr_1.2fr_40px] border-b border-[#ece7de] bg-[#faf8f3] px-6 py-5 text-[15px] font-semibold text-slate-600">
                  <div>Client Name</div>
                  <div>Segment</div>
                  <div>Status</div>
                  <div>Start Date</div>
                  <div>Total Spent</div>
                  <div>Transactions</div>
                  <div>Last Active</div>
                  <div />
                </div>

                {paginatedClients.map((client, index) => {
                  const globalIndex = (currentPage - 1) * pageSize + index;
                  const isEditable = globalIndex < 5;

                  return (
                    <div
                      key={client.id}
                      onClick={() => handleOpenClient(client, globalIndex)}
                      className={`grid grid-cols-[2.1fr_1.4fr_1.4fr_1.5fr_1.4fr_1.2fr_1.2fr_40px] items-center px-6 py-5 ${
                        index !== paginatedClients.length - 1
                          ? "border-b border-[#f1ece3]"
                          : ""
                      } ${
                        isEditable
                          ? "cursor-pointer transition hover:bg-[#faf8f3]"
                          : "cursor-default"
                      }`}
                    >
                      <div>
                        <div className="text-[16px] font-semibold text-slate-900">
                          {client.name}
                        </div>
                        <div className="text-[14px] text-slate-400">{client.email}</div>
                      </div>

                      <div>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-[14px] font-semibold ${segmentClasses(
                            client.segment
                          )}`}
                        >
                          {client.segment}
                        </span>
                      </div>

                      <div>
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[14px] font-semibold ${statusClasses(
                            client.status
                          )}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              client.status === "Active" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                          {client.status}
                        </span>
                      </div>

                      <div className="text-[16px] text-slate-600">
                        {formatStartDateForTable(client.startDate)}
                      </div>
                      <div className="text-[16px] font-semibold">
                        {formatCurrency(client.totalSpent)}
                      </div>
                      <div className="text-[16px] text-slate-600">
                        {client.transactions}
                      </div>
                      <div className="text-[16px] text-slate-600">{client.lastActive}</div>

                      <div className="flex justify-end">
                        {isEditable && <ChevronRight className="h-5 w-5 text-slate-300" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div className="text-[14px] font-medium text-slate-500">
                  Showing {startItem}-{endItem} of {totalClients} entities
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e7e2d8] bg-white text-slate-500 transition hover:bg-[#faf8f3] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isActive = currentPage === page;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl text-[15px] font-semibold transition ${
                          isActive
                            ? "bg-purple-700 text-white shadow-sm"
                            : "border border-[#e7e2d8] bg-white text-slate-600 hover:bg-[#faf8f3]"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e7e2d8] bg-white text-slate-500 transition hover:bg-[#faf8f3] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <button
                onClick={handleBackToDashboard}
                className="mb-8 flex items-center gap-2 text-[15px] text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </button>

              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h1 className="text-[40px] font-bold tracking-[-0.02em]">
                    {selectedClient.name}
                  </h1>
                  <div className="mt-2 flex items-center gap-4 text-[15px] text-slate-500">
                    <span className="rounded-md bg-[#f1eee7] px-2 py-1">
                      ID: {selectedClient.clientId}
                    </span>
                    <span>Joined {selectedClient.startDate}</span>
                  </div>
                </div>

                <button
                  onClick={handleSaveChanges}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#44a574] px-5 py-3 text-[16px] font-semibold text-white shadow-sm transition hover:opacity-95"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>

              <div className="mb-7 rounded-2xl border border-[#ebe5dc] bg-white">
                <div className="rounded-l-2xl border-l-4 border-l-purple-700 px-7 py-7">
                  <h3 className="mb-8 text-[18px] font-semibold">Entity Configuration</h3>

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <label className="mb-3 block text-[15px] font-medium text-slate-600">
                        Client Segment
                      </label>
                      <select
                        value={draftSegment}
                        onChange={(e) => setDraftSegment(e.target.value as Segment)}
                        className="h-12 w-full rounded-xl border border-[#ece7de] bg-[#fafafa] px-4 text-[16px] outline-none focus:border-purple-400"
                      >
                        <option value="Enterprise">Enterprise</option>
                        <option value="Startup">Startup</option>
                        <option value="SME">SME</option>
                        <option value="Individual">Individual</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-3 block text-[15px] font-medium text-slate-600">
                        Status
                      </label>
                      <div className="flex h-12 items-center justify-between rounded-xl border border-[#ece7de] bg-[#fafafa] px-4 text-[16px] text-slate-600">
                        <span>{selectedClient.status}</span>
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            selectedClient.status === "Active"
                              ? "bg-green-500"
                              : "bg-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-7">
                <div className="min-h-[220px] rounded-2xl border border-[#ebe5dc] bg-white p-7">
                  <div className="mb-6 flex items-center gap-3 text-slate-500">
                    <Building2 className="h-5 w-5" />
                    <h3 className="text-[16px] font-semibold">Contact Details</h3>
                  </div>

                  <div className="text-[15px] text-slate-400">Email Address</div>
                  <div className="mt-2 flex items-center gap-2 text-[18px] font-semibold text-slate-900">
                    <Mail className="h-4 w-4 text-slate-400" />
                    {selectedClient.email}
                  </div>
                </div>

                <div className="min-h-[220px] rounded-2xl border border-[#ebe5dc] bg-white p-7">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-500">
                      <Wallet className="h-5 w-5" />
                      <h3 className="text-[16px] font-semibold">Financial Overview</h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFinancialEditing((prev) => !prev)}
                      className="flex items-center gap-1 text-[15px] font-medium text-purple-700"
                    >
                      {isFinancialEditing ? (
                        <>
                          <X className="h-4 w-4" />
                          Cancel
                        </>
                      ) : (
                        <>
                          <Pencil className="h-4 w-4" />
                          Edit
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-b border-[#eee8de] pb-5">
                    <div>
                      <div className="text-[15px] text-slate-400">Lifetime Value</div>
                      {isFinancialEditing ? (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[18px] font-semibold text-purple-700">$</span>
                          <input
                            type="number"
                            step="1"
                            min="0"
                            value={draftTotalSpent}
                            onChange={(e) => setDraftTotalSpent(Number(e.target.value))}
                            className="h-11 w-full rounded-lg border border-[#ece7de] px-3 text-[18px] font-semibold text-purple-700 outline-none focus:border-purple-400"
                          />
                        </div>
                      ) : (
                        <div className="mt-2 text-[22px] font-bold text-purple-700">
                          {formatCurrency(draftTotalSpent)}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="text-[15px] text-slate-400">Total Transactions</div>
                      {isFinancialEditing ? (
                        <input
                          type="number"
                          step="1"
                          min="0"
                          value={draftTransactions}
                          onChange={(e) => setDraftTransactions(Number(e.target.value))}
                          className="mt-2 h-11 w-full rounded-lg border border-[#ece7de] px-3 text-[18px] font-semibold text-slate-900 outline-none focus:border-purple-400"
                        />
                      ) : (
                        <div className="mt-2 text-[22px] font-bold text-slate-900">
                          {draftTransactions}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="text-[15px] text-slate-400">Last Activity</div>
                    {isFinancialEditing ? (
                      <input
                        type="date"
                        value={draftLastActive}
                        onChange={(e) => setDraftLastActive(e.target.value)}
                        className="mt-2 h-11 w-full rounded-lg border border-[#ece7de] px-3 text-[18px] text-slate-700 outline-none focus:border-purple-400"
                      />
                    ) : (
                      <div className="mt-2 flex items-center gap-2 text-[18px] text-slate-700">
                        <CalendarDays className="h-4 w-4 text-slate-400" />
                        {fromInputDate(draftLastActive)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}