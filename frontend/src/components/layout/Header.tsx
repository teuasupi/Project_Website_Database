'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { MAIN_NAVIGATION, USER_NAVIGATION } from '@/lib/constants/navigation';
import { ROUTES, APP_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link href={ROUTES.HOME} className="flex items-center space-x-3">
          <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-lg font-bold">IKA</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-foreground text-lg font-bold">
              {APP_CONFIG.name}
            </div>
            <div className="text-muted-foreground text-xs">
              Teknik Elektro UPI
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {MAIN_NAVIGATION.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger className="h-10">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[100px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <NavigationMenuLink key={child.href} asChild>
                            <Link
                              href={child.href}
                              className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none"
                            >
                              <div className="text-sm leading-none font-medium">
                                {child.title}
                              </div>
                              {child.description && (
                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side - Auth and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* User Menu or Login Button */}
          {status === 'loading' ? (
            <div className="bg-muted h-8 w-8 animate-pulse rounded-full" />
          ) : session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={session.user.name || ''} />
                    <AvatarFallback>
                      {getUserInitials(
                        session.user.name || session.user.email || 'U'
                      )}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session.user.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session.user.email && (
                      <p className="text-muted-foreground w-[200px] truncate text-sm">
                        {session.user.email}
                      </p>
                    )}
                    {session.user.role === 'admin' && (
                      <Badge variant="secondary" className="w-fit text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                {USER_NAVIGATION.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
                {session.user.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href={ROUTES.ADMIN.DASHBOARD}
                        className="cursor-pointer"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex sm:space-x-2">
              <Button variant="ghost" asChild>
                <Link href={ROUTES.LOGIN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link href={ROUTES.REGISTER}>Join Alumni</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="bg-background border-t lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              {MAIN_NAVIGATION.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    <div className="space-y-2">
                      <h3 className="text-foreground font-medium">
                        {item.title}
                      </h3>
                      <div className="ml-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-muted-foreground hover:text-foreground block text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-foreground hover:text-primary block font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Auth Buttons */}
              {!session?.user && (
                <div className="space-y-2 border-t pt-4 sm:hidden">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link
                      href={ROUTES.LOGIN}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link
                      href={ROUTES.REGISTER}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Join Alumni
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
