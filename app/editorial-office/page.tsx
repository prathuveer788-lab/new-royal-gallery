"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import type {
  SafeMember,
  PrintIssueItem,
  EditorialSubmission,
  MemberNotification,
  DispatchedEmail,
} from "@/lib/membership/store";

export default function EditorialOfficeAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Admin Data
  const [activeTab, setActiveTab] = useState<
    "pending" | "members" | "emails" | "submissions" | "issues" | "config"
  >("pending");

  const [members, setMembers] = useState<SafeMember[]>([]);
  const [submissions, setSubmissions] = useState<EditorialSubmission[]>([]);
  const [printIssues, setPrintIssues] = useState<PrintIssueItem[]>([]);
  const [notifications, setNotifications] = useState<MemberNotification[]>([]);
  const [dispatchedEmails, setDispatchedEmails] = useState<DispatchedEmail[]>([]);
  const [liveMemberCount, setLiveMemberCount] = useState<number>(3592);
  const [baseMemberCount, setBaseMemberCount] = useState<number>(3592);
  const [membershipPrice, setMembershipPrice] = useState<number>(3999);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [actionMsg, setActionMsg] = useState("");
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [customIdInput, setCustomIdInput] = useState<{ [key: string]: string }>({});

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/data");
      if (res.ok) {
        const data = await res.json();
        setMembers(data.members || []);
        setSubmissions(data.submissions || []);
        setPrintIssues(data.printIssues || []);
        setNotifications(data.notifications || []);
        setDispatchedEmails(data.dispatchedEmails || []);
        setLiveMemberCount(data.liveMemberCount || 3592);
        if (data.config) {
          setBaseMemberCount(data.config.memberCount || 3592);
          setMembershipPrice(data.config.membershipPrice || 3999);
        }
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid Passcode");
      }

      await fetchData();
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : "Failed to authenticate.");
    }
  };

  // ── CORE ACTION: APPROVE MEMBER & ASSIGN PERMANENT ID ──
  const handleApproveMember = async (memberId: string) => {
    setApprovingId(memberId);
    setActionMsg("");

    try {
      const customId = customIdInput[memberId] || "";
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "APPROVE_MEMBER",
          payload: { memberId, customMembershipId: customId },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Approval failed.");

      setActionMsg(`✓ ${data.message} Member count incremented to ${data.liveMemberCount}.`);
      await fetchData();
    } catch (err: unknown) {
      setActionMsg(err instanceof Error ? err.message : "Approval failed.");
    } finally {
      setApprovingId(null);
    }
  };

  const handleUpdateMemberStatus = async (memberId: string, newStatus: "ACTIVE" | "SUSPENDED") => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_MEMBER_STATUS",
          payload: { memberId, status: newStatus },
        }),
      });

      if (res.ok) {
        setActionMsg("Member status updated.");
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateSubmission = async (
    submissionId: string,
    status: string,
    internalNotes?: string
  ) => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_SUBMISSION_STATUS",
          payload: { submissionId, status, internalNotes },
        }),
      });

      if (res.ok) {
        setActionMsg("Submission status updated.");
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdatePrintIssue = async (
    issueId: string,
    status: "Preparing" | "Dispatched" | "Delivered",
    trackingNumber?: string
  ) => {
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_PRINT_ISSUE",
          payload: { issueId, status, trackingNumber },
        }),
      });

      if (res.ok) {
        setActionMsg("Print issue delivery status updated.");
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_CONFIG",
          payload: { memberCount: baseMemberCount, membershipPrice },
        }),
      });

      if (res.ok) {
        setActionMsg("Configuration saved.");
        await fetchData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen pt-36 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]">
        <div className="text-center text-xs uppercase tracking-[0.24em] text-[#8A7352]">
          Verifying Editorial Office Credentials...
        </div>
      </div>
    );
  }

  // ── PASSCODE LOGIN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]">
        <div className="w-full max-w-md p-8 sm:p-10 bg-white border border-[#111111]/20 shadow-md text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block mb-2">
            Restricted Editorial Terminal
          </span>
          <h1
            className="text-2xl sm:text-3xl font-serif text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Editorial Office
          </h1>
          <div className="w-12 h-px mx-auto my-3 bg-[#8A7352]/40" />
          <p className="text-xs text-[#666666] font-sans mt-2 mb-6">
            Enter authorized Editorial Office passcode to approve pending memberships, dispatch cards, and review submissions.
          </p>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Editorial Passcode"
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] text-center focus:border-[#111111] focus:outline-none"
            />
            <button
              type="submit"
              className="w-full py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
            >
              Access Editorial Console →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingMembers = members.filter((m) => m.status === "PENDING_APPROVAL");
  const activeMembers = members.filter((m) => m.status === "ACTIVE");

  const filteredMembers = members.filter(
    (m) =>
      m.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.membershipId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: "#FAF8F5", color: "#111111" }} className="min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="border-b border-[#111111]/15 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold">
              The Royal Gallerys · Editorial Office Console
            </span>
            <h1
              className="text-3xl sm:text-4xl font-serif text-[#111111] mt-1"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Membership Approval & Curation
            </h1>
            <p className="text-xs text-[#666666] font-sans mt-0.5">
              Review applicant dossiers, assign Permanent Identifiers, unlock digital passes, and track localhost dispatches.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/membership"
              className="px-4 py-2 text-xs uppercase tracking-wider border border-[#111111]/20 text-[#111111] hover:bg-white"
            >
              View Public Page
            </Link>
            <Link
              href="/member/dashboard"
              className="px-4 py-2 text-xs uppercase tracking-wider border border-[#111111]/20 text-[#111111] hover:bg-white"
            >
              Member Dashboard
            </Link>
            <button
              onClick={async () => {
                await fetch("/api/admin/auth", { method: "DELETE" });
                setIsAuthenticated(false);
              }}
              className="px-4 py-2 text-xs uppercase tracking-wider border border-red-300 text-red-700 hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Action feedback */}
        {actionMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex justify-between items-center shadow-sm">
            <span className="font-medium">{actionMsg}</span>
            <button onClick={() => setActionMsg("")} className="text-base font-bold ml-4">✕</button>
          </div>
        )}

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 bg-white border border-[#111111]/10 shadow-sm">
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] font-semibold block">
              Live Public Member Count
            </span>
            <span className="text-3xl sm:text-4xl font-serif text-[#111111]">
              {liveMemberCount.toLocaleString("en-IN")}
            </span>
            <span className="block text-[10px] text-[#666666] mt-1 font-sans">
              Base: {baseMemberCount} + {activeMembers.length} Approved
            </span>
          </div>

          <div className="p-6 bg-white border border-[#111111]/10 shadow-sm">
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] font-semibold block">
              Awaiting Approval
            </span>
            <span className="text-3xl sm:text-4xl font-serif text-amber-700">
              {pendingMembers.length}
            </span>
            <span className="block text-[10px] text-amber-700 mt-1 font-sans font-medium">
              Action Required
            </span>
          </div>

          <div className="p-6 bg-white border border-[#111111]/10 shadow-sm">
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] font-semibold block">
              Active Lifetime Members
            </span>
            <span className="text-3xl sm:text-4xl font-serif text-emerald-700">
              {activeMembers.length}
            </span>
            <span className="block text-[10px] text-emerald-700 mt-1 font-sans">
              Cards Unlocked
            </span>
          </div>

          <div className="p-6 bg-white border border-[#111111]/10 shadow-sm">
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] font-semibold block">
              Dispatched Emails Log
            </span>
            <span className="text-3xl sm:text-4xl font-serif text-[#111111]">
              {dispatchedEmails.length}
            </span>
            <span className="block text-[10px] text-[#666666] mt-1 font-sans">
              Alerts & Confirmations
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-[#111111]/15 overflow-x-auto no-scrollbar">
          {[
            { id: "pending", label: `Pending Approvals (${pendingMembers.length})` },
            { id: "emails", label: `Dispatched Emails (${dispatchedEmails.length})` },
            { id: "members", label: `All Members (${members.length})` },
            { id: "submissions", label: `Editorial Submissions (${submissions.length})` },
            { id: "issues", label: "Print Issues" },
            { id: "config", label: "Counter & Pricing" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-[#111111] text-[#111111] font-bold"
                  : "text-[#777777] hover:text-[#111111]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── TAB 1: PENDING APPROVALS ── */}
        {activeTab === "pending" && (
          <div className="space-y-6">
            <div className="border-b border-[#111111]/10 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-[#111111]">
                  Pending Member Applications
                </h3>
                <p className="text-xs text-[#666666] font-sans mt-0.5">
                  Review candidates who submitted their coordinates. Assign Permanent Identifier and approve to unlock their Digital Card and increment the public member count.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 border border-amber-200">
                {pendingMembers.length} Applications Waiting
              </span>
            </div>

            {pendingMembers.length === 0 ? (
              <div className="p-12 text-center border border-[#111111]/10 bg-white">
                <p className="text-sm font-serif text-[#777777]">
                  No pending member applications at this moment. All candidate files are processed.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {pendingMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-8 bg-white border-2 border-amber-300 shadow-sm space-y-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#111111]/10 pb-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A7352] font-semibold">
                          Application Ref: {m.payment?.orderId || m.id}
                        </span>
                        <h4 className="text-2xl font-serif text-[#111111] font-medium mt-0.5">
                          {m.fullName}
                        </h4>
                        <p className="text-xs text-[#777777] font-sans">
                          Applied {new Date(m.joinedAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-3 py-1 bg-amber-100 text-amber-800 border border-amber-300 uppercase font-semibold">
                          ● Pending Editorial Approval
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs font-sans">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7352] block mb-1 font-semibold">
                          Contact Details
                        </span>
                        <p className="text-[#111111] font-medium">{m.email}</p>
                        <p className="text-[#555555] mt-0.5">{m.phone}</p>
                        {m.whatsapp && <p className="text-[#555555]">WA: {m.whatsapp}</p>}
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7352] block mb-1 font-semibold">
                          Print Issue Delivery Address
                        </span>
                        <p className="text-[#111111]">{m.address?.street}</p>
                        <p className="text-[#555555]">
                          {m.address?.city}, {m.address?.state} — {m.address?.pincode}
                        </p>
                        <p className="text-[#555555]">{m.address?.country}</p>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#8A7352] block mb-1 font-semibold">
                          Membership Tier & Payment
                        </span>
                        <p className="text-[#111111] font-semibold">The Royal Gallery Circle</p>
                        <p className="text-[#555555]">₹3,999 — Lifetime Standing</p>
                        <p className="text-emerald-700 font-medium mt-1">✓ Ready for Conversion</p>
                      </div>
                    </div>

                    {/* APPROVAL ACTION BAR */}
                    <div className="pt-6 border-t border-[#111111]/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FAF8F5] p-4">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <label className="text-xs font-sans text-[#111111] whitespace-nowrap font-medium">
                          Permanent Identifier:
                        </label>
                        <input
                          type="text"
                          defaultValue={m.membershipId || "RGC-003593"}
                          onChange={(e) =>
                            setCustomIdInput({ ...customIdInput, [m.id]: e.target.value })
                          }
                          className="bg-white border border-[#111111]/30 px-3 py-1.5 text-xs font-mono font-bold text-[#111111] w-36 uppercase"
                        />
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleApproveMember(m.id)}
                          disabled={approvingId === m.id}
                          className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] transition-colors shadow-sm"
                        >
                          {approvingId === m.id
                            ? "Approving & Notifying..."
                            : "✓ Approve & Activate Lifetime Member →"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: DISPATCHED EMAILS / LOCALHOST MAILBOX ── */}
        {activeTab === "emails" && (
          <div className="space-y-6">
            <div className="border-b border-[#111111]/10 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-serif text-[#111111]">
                  Localhost Mailbox & Dispatched Alerts
                </h3>
                <p className="text-xs text-[#666666] font-sans mt-0.5">
                  Every alert sent to hey.theroyalsgallery@gmail.com and member confirmations is recorded here.
                </p>
              </div>
              <span className="text-xs font-mono font-bold bg-white px-3 py-1 border border-[#111111]/15">
                {dispatchedEmails.length} Total Messages Dispatched
              </span>
            </div>

            {dispatchedEmails.length === 0 ? (
              <div className="p-12 text-center border border-[#111111]/10 bg-white">
                <p className="text-sm font-serif text-[#777777]">
                  No emails have been dispatched yet. When someone applies on the website, the alert will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {dispatchedEmails.map((eml) => (
                  <div
                    key={eml.id}
                    className="p-6 bg-white border border-[#111111]/15 shadow-sm space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#111111]/10 pb-3">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-[#8A7352] font-semibold">
                          {eml.type} · ID: {eml.id}
                        </span>
                        <h4 className="text-lg font-serif text-[#111111] font-medium mt-0.5">
                          {eml.subject}
                        </h4>
                      </div>
                      <span className="text-xs text-[#777777] font-sans">
                        {new Date(eml.sentAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="text-xs font-sans text-[#555555] space-y-1">
                      <p>
                        <strong>To:</strong>{" "}
                        <span className="text-[#111111] font-mono">{eml.to}</span>
                      </p>
                      <p>
                        <strong>From:</strong> {eml.from}
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#111111]/10 text-xs font-mono text-[#222222] whitespace-pre-wrap leading-relaxed">
                      {eml.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 3: ALL MEMBERS ── */}
        {activeTab === "members" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or permanent identifier..."
                className="w-full sm:max-w-md bg-white border border-[#111111]/20 px-4 py-2.5 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
              />
              <span className="text-xs text-[#666666] font-sans">
                Showing {filteredMembers.length} member records
              </span>
            </div>

            <div className="overflow-x-auto border border-[#111111]/15 bg-white">
              <table className="w-full text-left text-xs font-sans">
                <thead className="bg-[#FAF8F5] text-[#8A7352] uppercase tracking-wider text-[10px] border-b border-[#111111]/10">
                  <tr>
                    <th className="p-4">Permanent ID</th>
                    <th className="p-4">Member Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Mailing Address</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111111]/10">
                  {filteredMembers.map((m) => (
                    <tr key={m.id} className="hover:bg-[#FAF8F5]">
                      <td className="p-4 font-mono font-bold text-[#8A7352]">
                        {m.membershipId}
                      </td>
                      <td className="p-4">
                        <p className="font-serif text-sm font-medium text-[#111111]">{m.fullName}</p>
                        <span className="text-[10px] text-[#777777]">
                          Applied {new Date(m.joinedAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-4 text-[#555555] space-y-0.5">
                        <p className="text-[#111111] font-medium">{m.email}</p>
                        <p>{m.phone}</p>
                      </td>
                      <td className="p-4 text-[#555555] max-w-xs">
                        {m.address?.street}, {m.address?.city}, {m.address?.pincode}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 text-[10px] uppercase font-semibold tracking-wider rounded-xs ${
                            m.status === "ACTIVE"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : m.status === "PENDING_APPROVAL"
                              ? "bg-amber-100 text-amber-800 border border-amber-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {m.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {m.status === "PENDING_APPROVAL" ? (
                          <button
                            onClick={() => handleApproveMember(m.id)}
                            className="px-3 py-1 bg-[#111111] text-white hover:bg-[#8A7352] text-[10px] uppercase font-medium"
                          >
                            Approve
                          </button>
                        ) : m.status === "ACTIVE" ? (
                          <button
                            onClick={() => handleUpdateMemberStatus(m.id, "SUSPENDED")}
                            className="px-3 py-1 border border-red-300 text-red-700 hover:bg-red-50 text-[10px] uppercase"
                          >
                            Suspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateMemberStatus(m.id, "ACTIVE")}
                            className="px-3 py-1 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-[10px] uppercase"
                          >
                            Reactivate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: EDITORIAL SUBMISSIONS ── */}
        {activeTab === "submissions" && (
          <div className="space-y-6">
            {submissions.length === 0 ? (
              <div className="p-12 text-center border border-[#111111]/10 bg-white">
                <p className="text-sm font-serif text-[#777777]">
                  No member story proposals submitted yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-6 bg-white border border-[#111111]/15 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#8A7352] font-bold">{sub.id}</span>
                        <span className="text-[9px] uppercase px-2 py-0.5 border border-[#111111]/10 text-[#555555]">
                          {sub.category}
                        </span>
                      </div>
                      <span className="text-xs font-semibold uppercase text-[#8A7352]">
                        {sub.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif text-[#111111]">{sub.title}</h3>
                      <p className="text-xs text-[#777777] font-sans mt-0.5">
                        By <strong className="text-[#111111]">{sub.memberName}</strong> ({sub.membershipId}) · {sub.memberEmail}
                      </p>
                    </div>

                    <div className="p-4 bg-[#FAF8F5] border border-[#111111]/10 text-xs text-[#333333] leading-relaxed whitespace-pre-line">
                      {sub.description}
                    </div>

                    {sub.notes && (
                      <p className="text-[11px] text-[#666666]">
                        <strong>Attachment / Link:</strong>{" "}
                        <a href={sub.notes} target="_blank" rel="noreferrer" className="text-[#8A7352] underline break-all">
                          {sub.notes}
                        </a>
                      </p>
                    )}

                    <div className="pt-3 border-t border-[#111111]/10 flex items-center justify-between gap-3">
                      <span className="text-[10px] uppercase text-[#777777] font-medium">Update Status:</span>
                      <select
                        value={sub.status}
                        onChange={(e) => handleUpdateSubmission(sub.id, e.target.value)}
                        className="bg-white border border-[#111111]/20 px-3 py-1.5 text-xs text-[#111111] focus:border-[#111111] focus:outline-none"
                      >
                        <option value="Submitted">Submitted</option>
                        <option value="Under Editorial Review">Under Editorial Review</option>
                        <option value="Further Information Requested">Further Information Requested</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Published">Published</option>
                        <option value="Not Selected">Not Selected</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 5: PRINT ISSUES ── */}
        {activeTab === "issues" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {printIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-6 bg-white border border-[#111111]/15 shadow-sm space-y-4"
                >
                  <span className="text-[10px] uppercase font-mono text-[#8A7352] font-bold">
                    {issue.issueNumber} · {issue.period}
                  </span>
                  <h3 className="text-xl font-serif text-[#111111]">{issue.title}</h3>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1 font-semibold">
                      Dispatch Delivery Status
                    </label>
                    <div className="flex gap-2">
                      {(["Preparing", "Dispatched", "Delivered"] as const).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleUpdatePrintIssue(issue.id, s, issue.trackingNumber)}
                          className={`flex-1 py-1.5 text-[10px] uppercase tracking-wider border ${
                            issue.status === s
                              ? "bg-[#111111] text-white border-[#111111]"
                              : "border-[#111111]/20 text-[#555555] hover:bg-neutral-50"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#777777] mb-1 font-semibold">
                      Tracking Reference
                    </label>
                    <input
                      type="text"
                      defaultValue={issue.trackingNumber || ""}
                      onBlur={(e) =>
                        handleUpdatePrintIssue(issue.id, issue.status, e.target.value)
                      }
                      placeholder="e.g. TRG-PRT-904122"
                      className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2 text-xs text-[#111111]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 6: CONFIGURATION ── */}
        {activeTab === "config" && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="border-b border-[#111111]/10 pb-4">
              <h3 className="text-2xl font-serif text-[#111111]">
                Counter & Membership Pricing
              </h3>
              <p className="text-xs text-[#666666] font-sans mt-1">
                The public count automatically starts at this base number and increases as members are approved.
              </p>
            </div>

            <form onSubmit={handleSaveConfig} className="p-8 bg-white border border-[#111111]/15 shadow-sm space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
                  Base Member Count (Default: 3,592)
                </label>
                <input
                  type="number"
                  required
                  value={baseMemberCount}
                  onChange={(e) => setBaseMemberCount(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111]"
                />
                <span className="text-[10px] text-[#666666] block mt-1">
                  Current Live Public Count: <strong>{liveMemberCount.toLocaleString("en-IN")} MEMBERS</strong>.
                </span>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
                  Lifetime Membership Price (INR)
                </label>
                <input
                  type="number"
                  required
                  value={membershipPrice}
                  onChange={(e) => setMembershipPrice(Number(e.target.value))}
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111]"
                />
                <span className="text-[10px] text-[#666666] block mt-1">
                  Current fee: ₹{membershipPrice.toLocaleString("en-IN")} — LIFETIME.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
              >
                Save Configuration Updates
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
