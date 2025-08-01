// { key: '1', label: 'Option 1', icon: PieChartOutlined, route: 'home' },
// { key: '2', label: 'Option 2', icon: DesktopOutlined, route: 'home' },
// { key: 'sub1', label: 'User', icon: UserOutlined, children: [{ key: '3', label: 'Tom', route: 'home' }, { key: '4', label: 'Bill', route: 'home' }] },
// { key: 'sub2', label: 'Team', icon: TeamOutlined, children: [{ key: '6', label: 'Team 1', route: 'home' }, { key: '8', label: 'Team 2', route: 'home' }] },
// { key: '9', label: 'File', icon: FileOutlined, route: 'home' },
import {
    DesktopOutlined,
    UserAddOutlined,
    ShopOutlined,
    ShoppingOutlined
} from '@ant-design/icons-vue';
interface childrenItem {
    label: string,
    route: string
}
interface MenuItem {
    label: string,
    icon: any,
    children?: childrenItem[],
    route?: string
}
export const menuSidebar: MenuItem[] = [
    { label: 'clinic', icon: ShopOutlined, route: 'clinic' },
    // { label: 'manage_users', icon: UserAddOutlined, route: 'user.index' },
    // {
    //     label: 'manage_products',
    //     icon: ShoppingOutlined,
    //     children: [
    //         { label: 'unit', route: 'units.index' },
    //         { label: 'category', route: 'categories.index' }
    //     ]
    // },
    // { label: 'supplier', icon: DesktopOutlined, route: 'suppliers.index' }
]