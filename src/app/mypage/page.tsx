"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  project_id: string;
  project_title: string;
  favorite_count: number;
  registration_date: string;
  company_user_name: string;
}

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedUser, setSelectedUser] = useState("全案件");
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [companyUsers, setCompanyUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // 案件データを取得する関数
  const fetchProjects = async () => {
    if (!session?.user?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/projects?company_id=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const sortedProjects = (data.projects || []).sort((a: Project, b: Project) => {
          return parseInt(b.project_id) - parseInt(a.project_id);
        });
        setAllProjects(sortedProjects);
        setProjects(sortedProjects);

        // company_user_nameの一覧を作成
        const uniqueUsers = Array.from(new Set(sortedProjects.map((project: Project) => project.company_user_name).filter(name => name)));
        setCompanyUsers(uniqueUsers);
      } else {
        console.error('案件取得エラー:', response.statusText);
      }
    } catch (error) {
      console.error('API呼び出しエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProjects();
    }
  }, [session]);

  // フィルタリング処理
  useEffect(() => {
    if (selectedUser === "全案件") {
      setProjects(allProjects);
    } else {
      const filteredProjects = allProjects.filter(project => project.company_user_name === selectedUser);
      setProjects(filteredProjects);
    }
  }, [selectedUser, allProjects]);

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
      <div className="max-w-[1600px] mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">リサーチ案件一覧</h1>

          {/* フィルターボックス */}
          <div className="mb-6">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-64 px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="全案件">全案件</option>
              {companyUsers.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
          </div>

          {/* 案件カード一覧 */}
          {loading ? (
            <div className="text-center py-8">
              <div className="text-gray-600">読み込み中...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {projects.map((project, index) => (
                <div key={project.project_id || index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col h-full">
                  <div className="mb-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No.{project.project_id || index + 1}
                    </h3>
                    <h4 className="text-base text-gray-800 leading-relaxed">
                      {project.project_title || "タイトル未設定"}
                    </h4>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-600">
                    <div className="text-blue-600">
                      お気に入りの研究者数: {project.favorite_count || 0}名
                    </div>
                    <div>登録日: {project.registration_date || "未設定"}</div>
                    <div>登録者: {project.company_user_name || "未設定"}</div>
                  </div>

                  <Link
                    href={`/projects/${project.project_id}`}
                    className="block w-full py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors text-center"
                  >
                    詳細
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && projects.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-600">案件が見つかりませんでした。</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}