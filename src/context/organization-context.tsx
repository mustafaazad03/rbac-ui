'use client';
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/components/ui/user-chips';
import employee from '@/data/employee.json';

// Types for our data models
export interface Permission {
  id: string;
  name: string;
  description: string;
  isGranted: boolean;
}
export interface Role {
  label: string;
  description: string;
  badges: string[];
  manager: User;
  users: User[];
  permissions?: Permission[];
}
export interface Team {
  id: string;
  name: string;
  members: User[];
  lead: string;
  description: string;
}

// Context state interface
interface OrganizationContextType {
  employees: User[];
  roles: Role[];
  teams: Team[];
  
  // Employees methods
  addEmployee: (employee: User) => void;
  updateEmployee: (employeeId: string, updates: Partial<User>) => void;
  removeEmployee: (employeeId: string) => void;
  
  // Roles methods
  addRole: (role: Role) => void;
  updateRole: (roleLabel: string, updates: Partial<Role>) => void;
  removeRole: (roleLabel: string) => void;
  assignUsersToRole: (roleLabel: string, users: User[]) => void;
  updateRolePermissions: (roleLabel: string, permissions: Permission[]) => void;
  
  // Teams methods
  addTeam: (team: Team) => void;
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  removeTeam: (teamId: string) => void;
  assignUsersToTeam: (teamId: string, users: User[]) => void;
}

// Create the context
const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

// Provider component
export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<User[]>(employee as User[]);
  const [roles, setRoles] = useState<Role[]>([
    {
      label: "Engineering Lead",
      description: "Technical leadership and architecture decisions",
      badges: ["Engineering", "Architecture", "Team Leadership"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("Engineering")))
    },
    {
      label: "Product Manager",
      description: "Product strategy and roadmap planning",
      badges: ["Product Strategy", "Roadmap", "Stakeholder Management"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.role.includes("Product"))
    },
    {
      label: "Marketing Director",
      description: "Brand strategy and marketing campaigns",
      badges: ["Marketing", "Brand Strategy", "Communications"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("Marketing")))
    },
    {
      label: "HR Director",
      description: "Human resources and talent management",
      badges: ["HR", "Talent Management", "Employee Relations"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("HR")))
    },
    {
      label: "Security Manager",
      description: "Information security and compliance",
      badges: ["Security", "Compliance", "Risk Management"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("Security")))
    },
    {
      label: "Finance Director",
      description: "Financial planning and analysis",
      badges: ["Finance", "Analytics", "Budget Management"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("Finance")))
    },
    {
      label: "Design Lead",
      description: "UX/UI design leadership and design systems",
      badges: ["Design", "UX", "UI"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("Design")))
    },
    {
      label: "DevOps Manager",
      description: "Infrastructure and deployment management",
      badges: ["DevOps", "Infrastructure", "Cloud"],
      manager: employees.find(e => e.role === "Manager") || employees[0],
      users: employees.filter(e => e.teams.some(team => team.includes("DevOps")))
    }
  ]);
  const [teams, setTeams] = useState<Team[]>([
    {
      id: "team001",
      name: "Engineering",
      members: [
        employees.find(e => e.id === "emp001")!,
        employees.find(e => e.id === "emp002")!,
        employees.find(e => e.id === "emp004")!,
        employees.find(e => e.id === "emp008")!,
        employees.find(e => e.id === "emp012")!,
        employees.find(e => e.id === "emp016")!,
        employees.find(e => e.id === "emp020")!
      ],
      lead: "Sarah Johnson",
      description: "Handles all engineering tasks and development."
    },
    {
      id: "team002",
      name: "Design",
      members: [
        employees.find(e => e.id === "emp002")!,
        employees.find(e => e.id === "emp005")!,
        employees.find(e => e.id === "emp011")!,
        employees.find(e => e.id === "emp018")!
      ],
      lead: "Michael Chen",
      description: "Responsible for designing user interfaces and experiences."
    },
    {
      id: "team003",
      name: "Marketing",
      members: [
        employees.find(e => e.id === "emp003")!,
        employees.find(e => e.id === "emp009")!,
        employees.find(e => e.id === "emp018")!
      ],
      lead: "Emily Rodriguez",
      description: "Manages marketing strategies and campaigns."
    },
    {
      id: "team004",
      name: "Sales",
      members: [
        employees.find(e => e.id === "emp006")!,
        employees.find(e => e.id === "emp013")!
      ],
      lead: "David Thompson",
      description: "Focuses on sales and client acquisitions."
    },
    {
      id: "team005",
      name: "Support",
      members: [
        employees.find(e => e.id === "emp007")!,
        employees.find(e => e.id === "emp017")!
      ],
      lead: "Anna Martinez",
      description: "Provides customer support and success."
    },
    {
      id: "team006",
      name: "Product",
      members: [
        employees.find(e => e.id === "emp010")!,
        employees.find(e => e.id === "emp014")!
      ],
      lead: "Robert Taylor",
      description: "Oversees product development and management."
    },
    {
      id: "team007",
      name: "HR",
      members: [
        employees.find(e => e.id === "emp015")!
      ],
      lead: "Laura Silva",
      description: "Handles human resources and recruitment."
    },
    {
      id: "team008",
      name: "Quality Assurance",
      members: [
        employees.find(e => e.id === "emp016")!
      ],
      lead: "Alex Wong",
      description: "Ensures product quality and testing."
    },
    {
      id: "team009",
      name: "Research",
      members: [
        employees.find(e => e.id === "emp005")!
      ],
      lead: "Lisa Kim",
      description: "Conducts market and product research."
    },
    {
      id: "team010",
      name: "Infrastructure",
      members: [
        employees.find(e => e.id === "emp008")!,
        employees.find(e => e.id === "emp020")!
      ],
      lead: "Thomas Lee",
      description: "Manages IT infrastructure and deployments."
    },
    {
      id: "team011",
      name: "Analytics",
      members: [
        employees.find(e => e.id === "emp014")!,
        employees.find(e => e.id === "emp019")!
      ],
      lead: "Daniel Kim",
      description: "Handles data analysis and insights."
    },
    {
      id: "team012",
      name: "Documentation",
      members: [
        employees.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Creates and maintains product documentation."
    },
    {
      id: "team013",
      name: "Customer Success",
      members: [
        employees.find(e => e.id === "emp007")!,
        employees.find(e => e.id === "emp017")!
      ],
      lead: "Jessica Adams",
      description: "Ensures customer satisfaction and retention."
    },
    {
      id: "team014",
      name: "Backend",
      members: [
        employees.find(e => e.id === "emp001")!,
        employees.find(e => e.id === "emp012")!,
        employees.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains backend systems."
    },
    {
      id: "team015",
      name: "Frontend",
      members: [
        employees.find(e => e.id === "emp004")!,
        employees.find(e => e.id === "emp020")!
      ],
      lead: "James Wilson",
      description: "Develops and maintains frontend interfaces."
    },
    {
      id: "team016",
      name: "Security",
      members: [
        employees.find(e => e.id === "emp020")!
      ],
      lead: "John Davis",
      description: "Oversees security protocols and measures."
    },
    {
      id: "team017",
      name: "Brand",
      members: [
        employees.find(e => e.id === "emp011")!,
        employees.find(e => e.id === "emp018")!,
        employees.find(e => e.id === "emp003")!
      ],
      lead: "Rachel Green",
      description: "Manages brand strategy and identity."
    },
    {
      id: "team018",
      name: "Mobile",
      members: [
        employees.find(e => e.id === "emp002")!,
        employees.find(e => e.id === "emp010")!
      ],
      lead: "Thomas Lee",
      description: "Develops and maintains mobile applications."
    },
    {
      id: "team019",
      name: "Enterprise",
      members: [
        employees.find(e => e.id === "emp006")!,
        employees.find(e => e.id === "emp017")!
      ],
      lead: "David Thompson",
      description: "Handles enterprise-level projects and clients."
    },
    {
      id: "team020",
      name: "Documentation",
      members: [
        employees.find(e => e.id === "emp019")!
      ],
      lead: "Michelle Liu",
      description: "Maintains all project documentation and guides."
    }
  ]);

  // Employees methods
  const addEmployee = useCallback((newEmployee: User) => {
    setEmployees(prev => [...prev, newEmployee]);
  }, []);

  const updateEmployee = useCallback((employeeId: string, updates: Partial<User>) => {
    setEmployees(prev => 
      prev.map(emp => 
        emp.id === employeeId 
          ? { ...emp, ...updates } 
          : emp
      )
    );
  
    // Update employee in teams
    setTeams(prev => prev.map(team => ({
      ...team,
      members: team.members.map(member => 
        member.id === employeeId 
          ? { ...member, ...updates } 
          : member
      )
    })));
  
    // Update employee in roles
    setRoles(prev => prev.map(role => ({
      ...role,
      users: role.users.map(user => 
        user.id === employeeId 
          ? { ...user, ...updates } 
          : user
      )
    })));
  }, []);

  const removeEmployee = useCallback((employeeId: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    
    // Also remove the employee from roles and teams
    setRoles(prev => prev.map(role => ({
      ...role,
      users: role.users.filter(user => user.id !== employeeId)
    })));

    setTeams(prev => prev.map(team => ({
      ...team,
      members: team.members.filter(member => member.id !== employeeId)
    })));
  }, []);

  // Roles methods
  const addRole = useCallback((newRole: Role) => {
    setRoles(prev => [...prev, newRole]);
  }, []);

  const updateRole = useCallback((roleLabel: string, updates: Partial<Role>) => {
    setRoles(prev => 
      prev.map(role => 
        role.label === roleLabel ? { ...role, ...updates } : role
      )
    );
  }, []);

  const removeRole = useCallback((roleLabel: string) => {
    setRoles(prev => prev.filter(role => role.label !== roleLabel));
  }, []);

  const assignUsersToRole = useCallback((roleLabel: string, usersToAssign: User[]) => {
    setRoles(prev => 
      prev.map(role => 
        role.label === roleLabel 
          ? { 
              ...role, 
              users: [
                ...role.users, 
                ...usersToAssign.filter(
                  newUser => !role.users.some(existingUser => existingUser.id === newUser.id)
                )
              ] 
            }
          : role
      )
    );
  }, []);

  // Teams methods
  const addTeam = useCallback((newTeam: Team) => {
    setTeams(prev => [...prev, newTeam]);
  }, []);

  const updateTeam = useCallback((teamId: string, updates: Partial<Team>) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId ? { ...team, ...updates } : team
      )
    );
  }, []);

  const removeTeam = useCallback((teamId: string) => {
    setTeams(prev => prev.filter(team => team.id !== teamId));
  }, []);

  const assignUsersToTeam = useCallback((teamId: string, usersToAssign: User[]) => {
    setTeams(prev => 
      prev.map(team => 
        team.id === teamId 
          ? { 
              ...team, 
              members: [
                ...team.members, 
                ...usersToAssign.filter(
                  newUser => !team.members.some(existingUser => existingUser.id === newUser.id)
                )
              ] 
            }
          : team
      )
    );
  }, []);

  const updateRolePermissions = useCallback((roleLabel: string, permissions: Permission[]) => {
    setRoles(prev => 
      prev.map(role => 
        role.label === roleLabel 
          ? { ...role, permissions } 
          : role
      )
    );
  }, []);

  const contextValue = {
    employees,
    roles,
    teams,
    addEmployee,
    updateEmployee,
    removeEmployee,
    addRole,
    updateRole,
    removeRole,
    assignUsersToRole,
    addTeam,
    updateTeam,
    removeTeam,
    assignUsersToTeam,
    updateRolePermissions
  };

  return (
    <OrganizationContext.Provider value={contextValue}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};