import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'

const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: 'With GeoJson', href: '/with-geojson', current: false },
    { name: 'With Layers', href: '/with-layers', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }) {

    return (
        <div className="min-h-screen h-full flex flex-col bg-white">
            <Disclosure as="nav" className="bg-white border-b border-gray-200">
                {({ open }) => (
                    <>
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex">
                                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'border-indigo-500 text-gray-900'
                                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                                    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden sm:ml-6 sm:flex sm:items-center">

                                </div>
                                <div className="-mr-2 flex items-center sm:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="pt-2 pb-3 space-y-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                                                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                                            'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}
