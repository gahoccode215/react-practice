import { useCurrentApp } from "components/context/app.context"
import { useLocation } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}

const ProtectedRoute = (props: IProps) => {

    const { isAuthenticated, user } = useCurrentApp();
    const location = useLocation();

    if (isAuthenticated === false) {
        return (
            <div>Bạn chưa đăng nhập</div>
        )
    }

    const isAdminRoute = location.pathname.includes("admin")
    if (isAdminRoute === true && isAdminRoute === true) {
        const role = user?.role;
        if (role === "USER") {
            return (
                <div>Bạn không có quyền</div>
            )
        }
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default ProtectedRoute