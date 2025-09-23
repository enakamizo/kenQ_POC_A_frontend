"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { data: session } = useSession();
  
  const userName = session?.user?.name || "ユーザー";

  const handleLogout = async () => {
    // NextAuthのログアウト処理
    await signOut({ callbackUrl: "/login" });
  };


  return (
    <>
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      {/* 研Qロゴ */}
      <div className="text-xl font-bold">
        <Link href="/">
          <img src="/研Qロゴ.png" alt="研Qのロゴ" className="h-10" />
        </Link>
      </div>

      {/* 中央エリア（スペース確保用） */}
      <div className="flex-1"></div>

      {/* 右側のユーザーエリア */}
      <div className="flex items-center gap-6">
        {/* リサーチ案件一覧リンク */}
        <Link
          href="/mypage"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 22V12H15V22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          リサーチ案件一覧
        </Link>

        {/* 新規登録リンク */}
        <Link
          href="/register"
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M12 20H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.5 3.5C16.8978 3.10217 17.4374 2.87868 18 2.87868C18.2786 2.87868 18.5544 2.93355 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.5C19.697 3.697 19.8533 3.93085 19.9599 4.18823C20.0665 4.44561 20.1213 4.72141 20.1213 5C20.1213 5.27859 20.0665 5.55439 19.9599 5.81177C19.8533 6.06915 19.697 6.303 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          新規登録
        </Link>

        {/* ユーザー名 */}
        <span className="text-gray-700">{userName}</span>

        {/* ログアウトアイコン */}
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="text-gray-700 hover:text-gray-900 transition"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </header>


    {/* ログアウト確認ポップアップ */}
    {showLogoutConfirm && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full mx-4">
          <h2 className="text-lg font-semibold mb-4">ログアウト確認</h2>
          <p className="text-gray-600 mb-6">ログアウトしますか？</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
            >
              いいえ
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              はい
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Header;

