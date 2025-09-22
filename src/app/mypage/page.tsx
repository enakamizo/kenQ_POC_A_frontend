"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">マイページ</h1>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">ユーザー情報</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">ユーザー名:</span>
                  <span className="text-gray-900">{session.user?.company_user_name || "未設定"}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">名前:</span>
                  <span className="text-gray-900">{session.user?.name || "未設定"}</span>
                </div>
              </div>
            </div>

            <div className="text-gray-600">
              マイページの機能は順次追加予定です。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}