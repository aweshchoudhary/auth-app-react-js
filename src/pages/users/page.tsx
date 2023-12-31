import { useGetUsersQuery } from "@/redux/services/users.api";
import { UsersTable } from "./components/users-table";
import { userColumns } from "./components/table/column";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const UsersManagementPage = () => {
  const { data, isLoading, isFetching } = useGetUsersQuery(null);
  return (
    <section>
      <header className="py-5 px-10 bg-accent">
        <div className="flex gap-5 items-center">
          <Link className="block" to="/">
            <Icon icon="cil:arrow-left" className="text-3xl" />
          </Link>
          <h1 className="text-xl font-semibold ">User Management</h1>
        </div>
      </header>
      {isLoading || isFetching ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Icon icon="svg-spinners:90-ring-with-bg" className="text-5xl" />
        </div>
      ) : (
        <div className="md:p-10 p-5">
          <UsersTable columns={userColumns} data={data ?? []} />
        </div>
      )}
    </section>
  );
};

export default UsersManagementPage;
