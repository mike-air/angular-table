import { Injectable } from '@angular/core';
import { activityLogEntry } from '../Types';

@Injectable({
  providedIn: 'root',
})
export class ActivityDataService {
  private activityData: activityLogEntry[] = [
    {
      actor: {
        name: 'Kwame Nkrumah',
        id: 'MS000122',
        avatarInitials: 'KN',
      },
      action: 'Updated records for [Abena Aboagye] in [Grade 3]...',
      ipAddress: {
        address: '192.168.1.2',
        location: 'Accra',
      },
      date: {
        fullDate: '10th Oct, 2023',
        time: '09:15 AM',
      },
    },
    {
      actor: {
        name: 'Akosua Boateng',
        id: 'MS000123',
        avatarInitials: 'AB',
      },
      action: 'Removed student [Kwesi Owusu] from [Grade 1]...',
      ipAddress: {
        address: '10.0.0.3',
        location: 'Kumasi',
      },
      date: {
        fullDate: '15th Nov, 2023',
        time: '01:45 PM',
      },
    },
    {
      actor: {
        name: 'Kofi Mensah',
        id: 'MS000124',
        avatarInitials: 'KM',
      },
      action: 'Added student [Efua Asare] to [Grade 5]...',
      ipAddress: {
        address: '172.16.0.4',
        location: 'Takoradi',
      },
      date: {
        fullDate: '22nd Dec, 2023',
        time: '03:30 PM',
      },
    },
    {
      actor: {
        name: 'Esi Sarpong',
        id: 'MS000125',
        avatarInitials: 'ES',
      },
      action: 'Updated records for [Ama Serwaa] in [Grade 2]...',
      ipAddress: {
        address: '192.168.2.5',
        location: 'Tema',
      },
      date: {
        fullDate: '05th Jan, 2024',
        time: '11:00 AM',
      },
    },
    {
      actor: {
        name: 'Yaw Boakye',
        id: 'MS000126',
        avatarInitials: 'YB',
      },
      action: 'Removed student [Kofi Adom] from [Grade 4]...',
      ipAddress: {
        address: '10.1.1.6',
        location: 'Cape Coast',
      },
      date: {
        fullDate: '18th Feb, 2024',
        time: '02:25 PM',
      },
    },
  ];

  constructor() {}

  loadActivityData(): activityLogEntry[] {
    return this.activityData;
  }

  loadDataById(id: string): activityLogEntry | null {
    const data = this.activityData?.find((el) => el?.actor.id === id);
    return data ? data : null;
  }

  addactivityLogEntry(entry: activityLogEntry): void {
    this.activityData.push(entry);
  }

  updateactivityLogEntry(
    id: string,
    updatedEntry: Partial<activityLogEntry>
  ): boolean {
    const index = this.activityData.findIndex((el) => el.actor.id === id);
    if (index !== -1) {
      this.activityData[index] = {
        ...this.activityData[index],
        ...updatedEntry,
      };
      return true;
    }
    return false;
  }

  deleteactivityLogEntry(id: string): boolean {
    const index = this.activityData.findIndex((el) => el.actor.id === id);
    if (index !== -1) {
      this.activityData.splice(index, 1);
      return true;
    }
    return false;
  }

  filteractivityLogEntries(
    criteria: Partial<activityLogEntry>
  ): activityLogEntry[] {
    return this.activityData.filter((entry) => {
      return Object.keys(criteria).every(
        (key) =>
          entry[key as keyof activityLogEntry] ===
          criteria[key as keyof activityLogEntry]
      );
    });
  }

  searchactivityLogEntries(query: string): activityLogEntry[] {
    return this.activityData.filter((entry) => {
      return (
        entry.actor.name.toLowerCase().includes(query.toLowerCase()) ||
        entry.action.toLowerCase().includes(query.toLowerCase()) ||
        entry.ipAddress.address.includes(query)
      );
    });
  }

  paginateactivityLogEntries(
    page: number,
    pageSize: number
  ): { items: activityLogEntry[]; totalItems: number } {
    const startIndex = (page - 1) * pageSize;
    const paginatedItems = this.activityData.slice(
      startIndex,
      startIndex + pageSize
    );
    return {
      items: paginatedItems,
      totalItems: this.activityData.length,
    };
  }
}
