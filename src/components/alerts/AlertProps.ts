export interface AlertProps {
    message: string,
    action: 'error' | 'success' | 'warning' | 'info' | 'attention'
    id: string
}