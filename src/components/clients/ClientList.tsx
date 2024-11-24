import React, { useState } from 'react';
import { Client } from '../../types/client';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

interface ClientListProps {
  clients: Client[];
  onContextMenu: (e: React.MouseEvent, client: Client) => void;
  onClientClick: (client: Client) => void;
  status: 'building' | 'deposit' | 'all';
}

export const ClientList: React.FC<ClientListProps> = ({ 
  clients, 
  onContextMenu,
  onClientClick,
  status
}) => {
  const [isBuildingCollapsed, setIsBuildingCollapsed] = useState(false);
  const [isDepositCollapsed, setIsDepositCollapsed] = useState(false);

  const buildingClients = clients.filter(client => client.status === 'building');
  const depositClients = clients.filter(client => client.status === 'deposit');

  const renderClientGroup = (client: Client, index: number, groupIndex: number) => (
    <div
      key={client.id}
      className={`flex items-center px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
        client.status === 'building' ? 'border-l-4 border-emerald-500' : 
        client.status === 'deposit' ? 'border-l-4 border-amber-500' : ''
      }`}
      onContextMenu={(e) => onContextMenu(e, client)}
      onClick={() => onClientClick(client)}
    >
      <span className="w-12 text-gray-500 font-medium">{groupIndex + 1}</span>
      <div className="flex-1 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">
            {client.lastName} {client.firstName}
          </span>
          <span className="text-sm text-gray-500">
            {client.clientNumber || 'Нет номера'}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-900">{client.phone}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow divide-y">
      {/* Секция "Строим" */}
      {buildingClients.length > 0 && (
        <div>
          <div 
            className="flex items-center justify-between px-6 py-3 bg-emerald-50 cursor-pointer"
            onClick={() => setIsBuildingCollapsed(!isBuildingCollapsed)}
          >
            <div className="flex items-center gap-2">
              {isBuildingCollapsed ? (
                <ChevronRight className="w-5 h-5 text-emerald-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-emerald-600" />
              )}
              <h3 className="font-medium text-emerald-900">
                Строим ({buildingClients.length})
              </h3>
            </div>
          </div>
          {!isBuildingCollapsed && buildingClients.map((client, index) => 
            renderClientGroup(client, index, index)
          )}
        </div>
      )}

      {/* Секция "Задаток" */}
      {depositClients.length > 0 && (
        <div>
          <div 
            className="flex items-center justify-between px-6 py-3 bg-amber-50 cursor-pointer"
            onClick={() => setIsDepositCollapsed(!isDepositCollapsed)}
          >
            <div className="flex items-center gap-2">
              {isDepositCollapsed ? (
                <ChevronRight className="w-5 h-5 text-amber-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-amber-600" />
              )}
              <h3 className="font-medium text-amber-900">
                Задаток ({depositClients.length})
              </h3>
            </div>
          </div>
          {!isDepositCollapsed && depositClients.map((client, index) => 
            renderClientGroup(client, index, buildingClients.length + index)
          )}
        </div>
      )}

      {clients.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Нет клиентов
        </div>
      )}
    </div>
  );
};